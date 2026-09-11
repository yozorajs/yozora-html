import { describe, expect, it } from 'vitest'
import { render, text } from './helper'

describe('text renderers', () => {
  it.each([
    ['', ''],
    ['Hello 世界', 'Hello 世界'],
    [
      '<b>bold</b> & <script>removed</script>',
      '&lt;b&gt;bold&lt;/b&gt; &amp; &lt;script&gt;removed&lt;/script&gt;',
    ],
  ])('renders text %j', (value, expected) => {
    expect(render(text(value))).toBe(`<span class="yozora-text">${expected}</span>`)
  })

  it.each([
    ['paragraph', 'p'],
    ['blockquote', 'blockquote'],
    ['strong', 'strong'],
    ['emphasis', 'em'],
    ['delete', 'del'],
  ])('renders nested children in %s', (type, tag) => {
    expect(render({ type, children: [text('child')] })).toBe(
      `<${tag} class="yozora-${type}"><span class="yozora-text">child</span></${tag}>`,
    )
    expect(render({ type, children: [] })).toBe(`<${tag} class="yozora-${type}"></${tag}>`)
  })

  it.each([1, 2, 3, 4, 5, 6])('renders heading depth %i', depth => {
    expect(render({ type: 'heading', depth, children: [text('Title')] })).toBe(
      `<h${depth} class="yozora-heading"><span class="yozora-text">Title</span></h${depth}>`,
    )
  })

  it('renders standalone breaks', () => {
    expect(render({ type: 'break' })).toBe('<br class="yozora-break" />')
    expect(render({ type: 'thematicBreak' })).toBe('<hr class="yozora-thematic-break" />')
  })
})
