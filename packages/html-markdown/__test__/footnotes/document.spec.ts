import type { FootnoteDefinition, FootnoteReference, Root, Text } from '@yozora/ast'
import { describe, expect, it } from 'vitest'
import type { INodeRendererContext } from '../../src'
import { defaultRendererMap, renderMarkdown } from '../../src'

const reference = (identifier: string): FootnoteReference => ({
  type: 'footnoteReference',
  identifier,
  label: identifier,
})

const definition = (identifier: string): FootnoteDefinition => {
  const text: Text = { type: 'text', value: `body:${identifier}` }
  return { type: 'footnoteDefinition', identifier, label: identifier, children: [text] }
}

describe('document footnotes', () => {
  it('gives custom renderers complete backlinks before comment cleanup', () => {
    const a = definition('a')
    const b = definition('b')
    a.children.push(reference('b'))
    const calls: string[] = []
    const html = renderMarkdown(
      { type: 'root', children: [reference('a')] },
      {},
      { b, a },
      {
        ...defaultRendererMap,
        footnoteDefinition: (node, context) => {
          calls.push(node.identifier)
          const rendered = defaultRendererMap.footnoteDefinition(node, context)
          expect(rendered).toContain(`href="#reference-${node.identifier}-1"`)
          expect(rendered).not.toContain('<!--')
          return `<aside>${rendered.replace(/<!--[\s\S]*?-->/g, '')}</aside>`
        },
      },
    )
    expect(calls).toEqual(['b', 'a'])
    expect(html).toContain('href="#reference-b-1"')
    expect(html).toContain('href="#reference-a-1"')
  })

  it('prepares references in admonition titles and nested table cells', () => {
    const admonition = {
      type: 'admonition',
      keyword: 'note',
      title: [reference('title')],
      children: [],
    }
    const table = {
      type: 'table',
      columns: [{ align: null }],
      children: [
        { type: 'tableRow', children: [{ type: 'tableCell', children: [reference('cell')] }] },
      ],
    }
    const html = renderMarkdown(
      { type: 'root', children: [admonition, table] },
      {},
      {
        title: definition('title'),
        cell: definition('cell'),
      },
    )
    expect(html).toContain('id="reference-title-1"')
    expect(html).toContain('href="#reference-title-1"')
    expect(html).toContain('id="reference-cell-1"')
    expect(html).toContain('href="#reference-cell-1"')
  })

  it('ignores references inside definitions absent from the footer map and ignored node types', () => {
    const hidden = definition('hidden')
    hidden.children.push(reference('target'))
    const ignored = { type: 'footnote', children: [reference('target')] }
    const html = renderMarkdown(
      { type: 'root', children: [hidden, ignored] },
      {},
      {
        target: definition('target'),
      },
    )
    expect(html).not.toContain('id="reference-target-1"')
    expect(html).not.toContain('href="#reference-target-1"')
  })

  it('skips unresolved link children while traversing resolved link children', () => {
    const missing = {
      type: 'linkReference',
      identifier: 'missing',
      children: [reference('hidden')],
    }
    const resolved = {
      type: 'linkReference',
      identifier: 'resolved',
      children: [reference('shown')],
    }
    const html = renderMarkdown(
      { type: 'root', children: [missing, resolved] },
      {
        resolved: { type: 'definition', identifier: 'resolved', label: 'Resolved', url: '/target' },
      },
      { hidden: definition('hidden'), shown: definition('shown') },
    )
    expect(html).not.toContain('href="#reference-hidden-1"')
    expect(html).toContain('href="#reference-shown-1"')
  })

  it('tolerates missing document children from JavaScript callers', () => {
    const html = Reflect.apply(renderMarkdown, undefined, [{ type: 'root' }, {}, {}])
    expect(html).toContain('<main></main>')
  })
  it.each([
    ['a', 'b'],
    ['b', 'a'],
  ])('resolves cross-footnote backlinks with map order %s, %s', (first, second) => {
    const a = definition('a')
    const b = definition('b')
    a.children.push(reference('b'))
    b.children.push(reference('a'))
    const notes = new Map([
      ['a', a],
      ['b', b],
    ])
    const root: Root = { type: 'root', children: [reference('a')] }
    const html = renderMarkdown(
      root,
      {},
      Object.fromEntries([first, second].map(id => [id, notes.get(id)!])),
    )
    expect(html).toContain('href="#reference-a-1"')
    expect(html).toContain('href="#reference-b-1"')
    const ids = [...html.matchAll(/\bid="([^"]*)"/g)].map(match => match[1])
    for (const match of html.matchAll(/\bhref="#([^"]*)"/g)) {
      expect(ids).toContain(decodeURIComponent(match[1]))
    }
    expect(html).not.toContain('<!--yozora-footnote-backlink:')
  })

  it('keeps reference IDs and backlinks when a custom renderer delegates to the default', () => {
    const root: Root = { type: 'root', children: [reference('note'), reference('note')] }
    const note = definition('note')
    const html = renderMarkdown(
      root,
      {},
      { note },
      {
        ...defaultRendererMap,
        footnoteReference: (node, context) =>
          `<span>${defaultRendererMap.footnoteReference(node, context)}</span>`,
        footnoteDefinition: (node, context) =>
          `<aside>${defaultRendererMap.footnoteDefinition(node, context)}</aside>`,
      },
    )
    expect(html).toContain('<span><sup id="reference-note-1"')
    expect(html).toContain('<span><sup id="reference-note-2"')
    expect(html).toContain('<aside><div id="footnote-note"')
    expect(html).toContain('href="#reference-note-1"')
    expect(html.match(/id="reference-note-1"/g)).toHaveLength(1)
  })

  it('omits unreferenced backlinks when a custom definition renderer delegates', () => {
    const html = renderMarkdown(
      { type: 'root', children: [] },
      {},
      { unused: definition('unused') },
      {
        ...defaultRendererMap,
        footnoteDefinition: (node, context) => defaultRendererMap.footnoteDefinition(node, context),
      },
    )
    expect(html).not.toContain('href="#reference-')
    expect(html).not.toContain('<!--yozora-footnote-backlink:')
  })

  it('preserves literal text that resembles an old backlink marker', () => {
    const literal: Text = { type: 'text', value: '<!--yozora-footnote-backlink:0-->' }
    const html = renderMarkdown(
      { type: 'root', children: [literal] },
      {},
      { unused: definition('unused') },
    )
    expect(html).toContain('&lt;!--yozora-footnote-backlink:0--&gt;')
    expect(html).not.toContain('<!--yozora-footnote-backlink:0-->')
  })

  it('executes each custom definition renderer once', () => {
    const note = definition('note')
    let calls = 0
    renderMarkdown(
      { type: 'root', children: [note] },
      {},
      { note },
      {
        ...defaultRendererMap,
        footnoteDefinition: (node, context) => {
          calls += 1
          return defaultRendererMap.footnoteDefinition(node, context)
        },
      },
    )
    expect(calls).toBe(1)
  })

  it('propagates renderer errors without leaking reference state to another document', () => {
    expect(() =>
      renderMarkdown(
        { type: 'root', children: [reference('note'), { type: 'broken' }] },
        {},
        { note: definition('note') },
        {
          ...defaultRendererMap,
          broken: () => {
            throw new Error('render failed')
          },
        },
      ),
    ).toThrow('render failed')
    const html = renderMarkdown({ type: 'root', children: [] }, {}, { note: definition('note') })
    expect(html).not.toContain('href="#reference-')
  })

  it('preserves unrelated comments emitted by custom renderers', () => {
    const html = renderMarkdown(
      { type: 'root', children: [reference('note'), { type: 'comment' }] },
      {},
      { note: definition('note') },
      {
        ...defaultRendererMap,
        comment: () => '<!--yozora-footnote-backlink:0-->',
      },
    )
    expect(html).toContain('<!--yozora-footnote-backlink:0-->')
  })
  it('renders unreferenced definitions without dangling backlinks', () => {
    const html = renderMarkdown(
      { type: 'root', children: [] },
      {},
      { unused: definition('unused') },
    )
    expect(html).toContain('id="footnote-unused"')
    expect(html).toContain('body:unused')
    expect(html).not.toContain('href="#reference-')
  })
  it('renders top-level and nested definitions once in the footer without mutating the AST', () => {
    const first = definition('first')
    const second = definition('second')
    const third = definition('third')
    first.children.push(third)
    const blockquote = { type: 'blockquote', children: [reference('second'), second] }
    const root: Root = { type: 'root', children: [reference('first'), first, blockquote] }
    const notes = { first, second, third }
    const original = JSON.stringify({ root, notes })
    const html = renderMarkdown(root, {}, notes)
    const main = html.slice(html.indexOf('<main>'), html.indexOf('</main>'))
    expect(main).toContain('yozora-blockquote')
    expect(main).not.toContain('body:')
    expect(main).not.toContain('yozora-footnote-definition')
    for (const identifier of ['first', 'second', 'third']) {
      expect(html.split(`body:${identifier}`)).toHaveLength(2)
      expect(html).toContain(`id="footnote-${identifier}"`)
    }
    expect(JSON.stringify({ root, notes })).toBe(original)
  })

  it.each(['note', 'a b/中文', '<b>x</b>&"', 'percent%20value', 'reference-note-1'])(
    'links both directions for %j',
    identifier => {
      const node = definition(identifier)
      const root: Root = { type: 'root', children: [reference(identifier)] }
      const html = renderMarkdown(root, {}, { [identifier]: node })
      const ids = [...html.matchAll(/\bid="([^"]*)"/g)].map(match => match[1])
      const targets = [...html.matchAll(/\bhref="#([^"]*)"/g)].map(match =>
        decodeURIComponent(match[1]),
      )
      expect(ids).toHaveLength(2)
      expect(new Set(ids).size).toBe(2)
      expect(targets).toHaveLength(2)
      expect(targets).toEqual([ids[1], ids[0]])
    },
  )

  it('allocates unique IDs for repeated references and resets numbering per document', () => {
    const note = definition('note')
    const other = definition('note-1')
    const root: Root = {
      type: 'root',
      children: [reference('note'), reference('note'), reference('note-1')],
    }
    const html = renderMarkdown(root, {}, { note, 'note-1': other })
    const ids = [...html.matchAll(/\bid="([^"]*)"/g)].map(match => match[1])
    expect(new Set(ids).size).toBe(5)
    expect(html).toContain('id="reference-note-1"')
    expect(html).toContain('id="reference-note-2"')
    expect(html).toContain('id="reference-note-1-1"')
    expect(html).toContain('href="#reference-note-1"')
    expect(renderMarkdown(root, {}, { note, 'note-1': other })).toBe(html)
  })

  it('uses one reference counter for main and footnote content', () => {
    const note = definition('note')
    note.children.push(reference('note'))
    const root: Root = { type: 'root', children: [reference('note')] }
    const html = renderMarkdown(root, {}, { note })
    expect(html).toContain('id="reference-note-1"')
    expect(html).toContain('id="reference-note-2"')
    expect(html.match(/href="#footnote-note"/g)).toHaveLength(2)
  })

  it('uses custom definition and descendant renderers only in the footer', () => {
    const note = definition('note')
    const nested = definition('nested')
    note.children.push(nested)
    const root: Root = { type: 'root', children: [note] }
    const rendered: string[] = []
    const rendererMap = {
      ...defaultRendererMap,
      footnoteDefinition: (node: FootnoteDefinition, context: INodeRendererContext) => {
        rendered.push(node.identifier)
        return `<aside>${context.renderChildren(node.children)}</aside>`
      },
      text: (node: { value: string }) => node.value.toUpperCase(),
    }
    const html = renderMarkdown(root, {}, { note, nested }, rendererMap)
    expect(rendered).toEqual(['note', 'nested'])
    expect(html).toContain('<main></main>')
    expect(html).toContain(
      '<ul class="yozora-footnote-definitions__main">' +
        '<li><aside>BODY:NOTE</aside></li><li><aside>BODY:NESTED</aside></li></ul>',
    )
    expect(rendererMap.footnoteDefinition).not.toBe(defaultRendererMap.footnoteDefinition)
  })

  it.each([
    { visible: [], expected: '' },
    {
      visible: ['first', 'last'],
      expected: '<li><aside>body:first</aside></li><li><aside>body:last</aside></li>',
    },
  ])('omits empty list items when visible definitions are $visible', ({ visible, expected }) => {
    const rendered: string[] = []
    const html = renderMarkdown(
      { type: 'root', children: [] },
      {},
      { first: definition('first'), hidden: definition('hidden'), last: definition('last') },
      {
        ...defaultRendererMap,
        footnoteDefinition: (node, context) => {
          rendered.push(node.identifier)
          return visible.includes(node.identifier)
            ? `<aside>${context.renderChildren(node.children)}</aside>`
            : ''
        },
        text: node => node.value,
      },
    )
    expect(html).toContain(`<ul class="yozora-footnote-definitions__main">${expected}</ul>`)
    expect(rendered).toEqual(['first', 'hidden', 'last'])
  })

  it('retains a custom reference renderer', () => {
    const root: Root = { type: 'root', children: [reference('note')] }
    const html = renderMarkdown(
      root,
      {},
      { note: definition('note') },
      {
        ...defaultRendererMap,
        footnoteReference: () => '<sup>custom reference</sup>',
      },
    )
    expect(html).toContain('<main><sup>custom reference</sup></main>')
  })

  it('preserves tolerance for missing children in custom renderers', () => {
    const root: Root = { type: 'root', children: [{ type: 'empty' }] }
    expect(
      renderMarkdown(
        root,
        {},
        {},
        {
          ...defaultRendererMap,
          empty: (_node, context) => Reflect.apply(context.renderChildren, context, [undefined]),
        },
      ),
    ).toContain('<main></main>')
  })
})
