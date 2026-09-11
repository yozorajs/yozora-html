import { describe, expect, it } from 'vitest'
import { render } from './helper'

describe('code renderers', () => {
  it('highlights a supported language with Prism', () => {
    const html = render({ type: 'code', lang: 'javascript', meta: null, value: 'const n = 1;' })
    expect(html).toContain('<span class="token keyword">const</span>')
    expect(html).toContain('<span class="token number">1</span>')
    expect(html.startsWith('<pre class="yozora-code"><code>')).toBe(true)
    expect(html.endsWith('</code></pre>')).toBe(true)
  })

  it.each([null, '', 'unknown-language'])('preserves unhighlighted code with language %j', lang => {
    expect(render({ type: 'code', lang, meta: null, value: '<b>plain</b> & text' })).toBe(
      '<pre class="yozora-code"><code>&lt;b&gt;plain&lt;/b&gt; &amp; text</code></pre>',
    )
  })

  it('escapes markup in highlighted code rather than inserting HTML elements', () => {
    const html = render({
      type: 'code',
      lang: 'markup',
      meta: null,
      value: '<script>alert(1)</script>',
    })
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;')
    expect(html.replace(/<[^>]*>/g, '')).toBe('&lt;script>alert(1)&lt;/script>')
  })

  it('renders empty block code', () => {
    expect(render({ type: 'code', lang: null, meta: null, value: '' })).toBe(
      '<pre class="yozora-code"><code></code></pre>',
    )
  })

  it('preserves and escapes inline code', () => {
    expect(render({ type: 'inlineCode', value: '<b>inline</b> & text' })).toBe(
      '<code class="yozora-inline-code">&lt;b&gt;inline&lt;/b&gt; &amp; text</code>',
    )
  })

  it.each(['code', 'inlineCode'])('preserves script text, entities and whitespace in %s', type => {
    const value = '\t<script>alert("x")</script>\n&lt;tag&gt;\u00a0'
    const expected = '\t&lt;script&gt;alert("x")&lt;/script&gt;\n&amp;lt;tag&amp;gt;\u00a0'
    const className = type === 'code' ? 'yozora-code' : 'yozora-inline-code'
    const html = render({ type, lang: null, meta: null, value })
    expect(html).toBe(
      type === 'code'
        ? `<pre class="${className}"><code>${expected}</code></pre>`
        : `<code class="${className}">${expected}</code>`,
    )
    expect(html).not.toContain('<script>')
  })
})
