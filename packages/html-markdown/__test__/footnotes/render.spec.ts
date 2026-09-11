import type { FootnoteDefinition, Text } from '@yozora/ast'
import { describe, expect, it } from 'vitest'
import { createNodesRendererContext } from '../../src'
import {
  renderFootnoteDefinitions,
  renderFootnoteReference,
} from '../../src/renderer/footnote/render'

describe('footnotes', () => {
  it('places the default definition inside a list item', () => {
    const content: Text = { type: 'text', value: 'Content' }
    const node: FootnoteDefinition = {
      type: 'footnoteDefinition',
      identifier: 'note',
      label: '1',
      children: [content],
    }
    expect(renderFootnoteDefinitions([node], createNodesRendererContext({}, {}))).toBe(
      '<div class="yozora-footnote-definitions">' +
        '<div class="yozora-footnote-definitions__title">footnote-definitions</div>' +
        '<ul class="yozora-footnote-definitions__main"><li>' +
        '<div id="footnote-note" class="yozora-footnote-definition">' +
        '<p class="yozora-footnote-definition__title yozora-paragraph"><span>&nbsp;[1]:&nbsp;</span></p>' +
        '<div class="yozora-footnote-definition__content"><span class="yozora-text">Content</span></div>' +
        '</div></li></ul></div>',
    )
  })

  it('escapes quoted labels and emits HTML class attributes', () => {
    const context = createNodesRendererContext({}, {})
    const label = 'x" onclick="alert(1)'
    const reference = renderFootnoteReference(
      { type: 'footnoteReference', identifier: 'note', label },
      context,
    )
    expect(reference).toContain('title="x&quot; onclick=&quot;alert(1)"')
    expect(reference.match(/<a[^>]*>/)?.[0]).toBe(
      '<a href="#footnote-note" title="x&quot; onclick=&quot;alert(1)">',
    )
    const definition: FootnoteDefinition = {
      type: 'footnoteDefinition',
      identifier: label,
      label: '1',
      children: [],
    }
    renderFootnoteReference({ type: 'footnoteReference', identifier: label, label: '1' }, context)
    const html = renderFootnoteDefinitions([definition], context)
    expect(html).toContain('href="#reference-x%2522%2520onclick%253D%2522alert(1)-1"')
    expect(html).toContain('class="yozora-footnote-definition"')
    expect(html).not.toContain('className=')
  })
  it('encodes reference identifiers and escapes markup in labels', () => {
    const context = createNodesRendererContext({}, {})
    expect(
      renderFootnoteReference(
        { type: 'footnoteReference', identifier: 'a b/中文', label: '<b>1</b>' },
        context,
      ),
    ).toBe(
      '<sup id="reference-a%20b%2F%E4%B8%AD%E6%96%87-1" class="yozora-footnote-reference">' +
        '<a href="#footnote-a%2520b%252F%25E4%25B8%25AD%25E6%2596%2587" title="&lt;b&gt;1&lt;/b&gt;">[&lt;b&gt;1&lt;/b&gt;]</a></sup>',
    )
  })

  it('renders definitions in input order with sanitized labels and rendered children', () => {
    const definitions: FootnoteDefinition[] = ['first', 'second'].map(identifier => ({
      type: 'footnoteDefinition',
      identifier,
      label: `<b>${identifier}</b>`,
      children: [{ type: 'text', value: `${identifier} content` }],
    }))
    const context = createNodesRendererContext({}, {})
    for (const node of definitions) {
      renderFootnoteReference(
        { type: 'footnoteReference', identifier: node.identifier, label: node.label },
        context,
      )
    }
    const html = renderFootnoteDefinitions(definitions, context)
    expect(html).toContain('<span class="yozora-text">first content</span>')
    expect(html).toContain('<span class="yozora-text">second content</span>')
    expect(html.indexOf('first content')).toBeLessThan(html.indexOf('second content'))
    expect(html).toContain('<a href="#reference-first-1">&uarr;</a>')
    expect(html).toContain('<span>&nbsp;[&lt;b&gt;first&lt;/b&gt;]:&nbsp;</span>')
    expect(html).not.toContain('<b>')
  })

  it('handles an empty set of definitions', () => {
    expect(renderFootnoteDefinitions([], createNodesRendererContext({}, {}))).toContain(
      '<ul class="yozora-footnote-definitions__main"></ul>',
    )
  })
})
