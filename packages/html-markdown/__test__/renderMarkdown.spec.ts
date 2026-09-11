import type { Definition, FootnoteDefinition, Root } from '@yozora/ast'
import { describe, expect, it } from 'vitest'
import renderMarkdown, { createNodesRendererContext, defaultRendererMap } from '../src'

describe('renderMarkdown', () => {
  it('renders an empty document with its main and footer containers', () => {
    const root: Root = { type: 'root', children: [] }
    expect(renderMarkdown(root, {}, {})).toBe(
      '<section class="yozora-markdown"><main></main><footer>' +
        '<div class="yozora-footnote-definitions"><div class="yozora-footnote-definitions__title">footnote-definitions</div>' +
        '<ul class="yozora-footnote-definitions__main"></ul></div></footer></section>',
    )
  })

  it('passes custom renderers to both document content and footnote content', () => {
    const body = { type: 'text', value: 'body' }
    const note = { type: 'text', value: 'note' }
    const root: Root = { type: 'root', children: [body] }
    const footnote: FootnoteDefinition = {
      type: 'footnoteDefinition',
      identifier: '1',
      label: '1',
      children: [note],
    }
    const custom = {
      ...defaultRendererMap,
      text: (node: typeof body) => `[${node.value.toUpperCase()}]`,
    }
    const original = structuredClone({ root, footnote })
    const html = renderMarkdown(root, {}, { '1': footnote }, custom)
    expect(html).toContain('<main>[BODY]</main>')
    expect(html).toContain('[NOTE]')
    expect(renderMarkdown(root, {}, {})).toContain('<span class="yozora-text">body</span>')
    expect({ root, footnote }).toEqual(original)
  })

  it('resolves document link and image references from the supplied definitions', () => {
    const link = {
      type: 'linkReference',
      identifier: 'ref',
      children: [{ type: 'text', value: 'link' }],
    }
    const image = { type: 'imageReference', identifier: 'ref', alt: 'Image description' }
    const root: Root = { type: 'root', children: [link, image] }
    const definition: Definition = {
      type: 'definition',
      identifier: 'ref',
      label: 'Asset',
      url: '/asset',
      title: undefined,
    }
    const html = renderMarkdown(root, { ref: definition }, {})
    expect(html).toContain('href="/asset"')
    expect(html).toContain('src="/asset"')
    expect(html).toContain('alt="Image description"')
    expect(html).toContain('<span class="yozora-text">link</span>')
  })
})

describe('createNodesRendererContext', () => {
  it('exposes definition maps and supports recursive extensions', () => {
    const note: FootnoteDefinition = {
      type: 'footnoteDefinition',
      identifier: 'note',
      label: '1',
      children: [],
    }
    const context = createNodesRendererContext(
      {},
      { note },
      {
        ...defaultRendererMap,
        extension: (node, current) => current.renderChildren(node.children),
      },
    )
    const extension = { type: 'extension', children: [{ type: 'inlineMath', value: 'x' }] }
    expect(context.getFootnoteDefinition('note')).toBe(note)
    expect(context.renderChildren([extension])).toBe('<span class="yozora-inline-math">x</span>')
  })
})
