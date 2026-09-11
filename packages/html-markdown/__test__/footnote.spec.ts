import type { FootnoteDefinition } from '@yozora/ast'
import { describe, expect, it } from 'vitest'
import { createNodesRendererContext } from '../src'
import { renderFootnoteReference } from '../src/renderer/footnoteReference'
import { renderFootnoteDefinitions } from '../src/renderFootnoteDefinitions'

describe('footnotes', () => {
  it('encodes reference identifiers and strips markup from labels', () => {
    const context = createNodesRendererContext({}, {})
    expect(
      renderFootnoteReference(
        { type: 'footnoteReference', identifier: 'a b/中文', label: '<b>1</b>' },
        context,
      ),
    ).toBe(
      '<sup id="reference-a%20b%2F%E4%B8%AD%E6%96%87" class="yozora-footnote-reference">' +
        '<a href="#a%20b%2F%E4%B8%AD%E6%96%87" title="1">[1]</a></sup>',
    )
  })

  it('renders definitions in input order with sanitized labels and rendered children', () => {
    const definitions: FootnoteDefinition[] = ['first', 'second'].map(identifier => ({
      type: 'footnoteDefinition',
      identifier,
      label: `<b>${identifier}</b>`,
      children: [{ type: 'text', value: `${identifier} content` }],
    }))
    const html = renderFootnoteDefinitions(definitions, createNodesRendererContext({}, {}))
    expect(html).toContain('<span class="yozora-text">first content</span>')
    expect(html).toContain('<span class="yozora-text">second content</span>')
    expect(html.indexOf('first content')).toBeLessThan(html.indexOf('second content'))
    expect(html).toContain('<a href="#reference-first">&uarr;</a>')
    expect(html).toContain('<span>&nbsp;[first]:&nbsp;</span>')
    expect(html).not.toContain('<b>')
  })

  it('handles an empty set of definitions', () => {
    expect(renderFootnoteDefinitions([], createNodesRendererContext({}, {}))).toContain(
      '<ul class="yozora-footnote-definitions__main"></ul>',
    )
  })
})
