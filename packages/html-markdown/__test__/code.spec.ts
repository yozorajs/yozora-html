import prism from 'prismjs'
import { describe, expect, it } from 'vitest'
import { render } from './helper'

function codeHtml(html: string): string {
  const match = /<code class="yozora-code__content">([\s\S]*)<\/code>/.exec(html)
  expect(match).not.toBeNull()
  return match![1]
}

function renderWithWrapHook(hook: prism.hooks.HookCallback): string {
  const previous = prism.hooks.all.wrap
  prism.hooks.all.wrap = [...previous, hook]
  try {
    return render({ type: 'code', lang: 'typescript', value: 'const count = 1;' })
  } finally {
    prism.hooks.all.wrap = previous
  }
}

describe('code renderers', () => {
  it('highlights a supported language with Prism', () => {
    const html = render({ type: 'code', lang: 'javascript', meta: null, value: 'const n = 1;' })
    expect(html).toContain('<span class="token keyword">const</span>')
    expect(html).toContain('<span class="token number">1</span>')
    expect(html.startsWith('<div class="yozora-code">')).toBe(true)
    expect(html).toContain('<span class="yozora-code__language">javascript</span>')
    expect(html).toContain('tabindex="0" role="region" aria-label="javascript code block"')
    expect(html.endsWith('</code></pre></div></div>')).toBe(true)
  })

  it.each([null, '', 'unknown-language', '__proto__', 'extend'])(
    'preserves unhighlighted code with language %j',
    lang => {
      expect(
        codeHtml(render({ type: 'code', lang, meta: null, value: '<b>plain</b> & text' })),
      ).toBe('&lt;b&gt;plain&lt;/b&gt; &amp; text')
    },
  )

  it.each(['typescript', 'ts'])('highlights TypeScript with language %j', lang => {
    const html = render({ type: 'code', lang, meta: null, value: 'const count: number = 1;' })
    expect(html).toContain('<span class="token keyword">const</span>')
    expect(html).toContain('<span class="token builtin">number</span>')
    expect(html).toContain('<span class="token number">1</span>')
  })

  it('preserves the exact name of a custom Prism grammar', () => {
    prism.languages.YozoraCustom = { keyword: /custom/ }
    try {
      const html = render({ type: 'code', lang: 'YozoraCustom', value: 'custom' })
      expect(html).toContain('<span class="yozora-code__language">YozoraCustom</span>')
      expect(codeHtml(html)).toBe('<span class="token keyword">custom</span>')
    } finally {
      delete prism.languages.YozoraCustom
    }
  })

  it('escapes the language label and accessible name', () => {
    const html = render({ type: 'code', lang: '"><script>alert(1)</script>', value: 'literal' })
    expect(html).toContain('&quot;&gt;&lt;script&gt;alert(1)&lt;/script&gt; code block')
    expect(html).toContain('&gt;&lt;script&gt;alert(1)&lt;/script&gt;</span>')
    expect(html).not.toContain('<script>')
    expect(codeHtml(html)).toBe('literal')
  })

  it('removes hook-supplied attributes while preserving token classes and contents', () => {
    const html = renderWithWrapHook(env => {
      env.attributes = {
        ...env.attributes,
        onclick: 'globalThis.__xssExecuted = true',
        style: 'position:fixed;inset:0',
        id: 'injected',
        title: 'injected',
        'data-payload': 'injected',
      }
    })
    expect(codeHtml(html)).toBe(
      '<span class="token keyword">const</span> count <span class="token operator">=</span> ' +
        '<span class="token number">1</span><span class="token punctuation">;</span>',
    )
  })

  it.each([
    '<script>globalThis.__xssExecuted = true</script>',
    '<style>body{display:none}</style>',
    '<img src=x onerror="globalThis.__xssExecuted = true">',
    '<svg onload="globalThis.__xssExecuted = true"><circle r="10" /></svg>',
    '<iframe srcdoc="<script>parent.__xssExecuted=true</script>"></iframe>',
    '</span></code></pre><img src=x onerror="globalThis.__xssExecuted = true">',
  ])('removes active markup emitted by a wrap hook: %s', payload => {
    const html = renderWithWrapHook(env => {
      if (env.type === 'keyword') env.content += payload
    })
    expect(codeHtml(html)).toBe(
      '<span class="token keyword">const</span> count <span class="token operator">=</span> ' +
        '<span class="token number">1</span><span class="token punctuation">;</span>',
    )
    expect(html).not.toContain('__xssExecuted')
  })

  it('discards links created by a wrap hook while keeping their text', () => {
    const html = renderWithWrapHook(env => {
      if (env.type === 'keyword') {
        env.tag = 'a'
        env.attributes = { ...env.attributes, href: 'javascript:alert(1)' }
      }
    })
    expect(codeHtml(html)).toBe(
      'const count <span class="token operator">=</span> ' +
        '<span class="token number">1</span><span class="token punctuation">;</span>',
    )
  })

  it('filters attributes injected through a grammar alias', () => {
    prism.languages.YozoraUnsafeAlias = {
      word: { pattern: /payload/, alias: 'custom" onclick="alert(1)' },
    }
    try {
      const html = render({ type: 'code', lang: 'YozoraUnsafeAlias', value: 'payload' })
      expect(codeHtml(html)).toBe('<span class="token word custom">payload</span>')
    } finally {
      delete prism.languages.YozoraUnsafeAlias
    }
  })

  it.each(['\n', '\r\n', '\r'])('numbers blank and trailing lines with newline %j', newline => {
    const value = `first${newline}${newline}third${newline}`
    const html = render({ type: 'code', lang: null, value })
    expect(html).toContain(
      '<div class="yozora-code__line-numbers" aria-hidden="true"><span>1</span><span>2</span><span>3</span><span>4</span></div>',
    )
    expect(codeHtml(html)).toBe(value)
  })

  it('preserves multi-line token boundaries', () => {
    const value = '/* first\n second */\nconst count = 1;'
    const html = render({ type: 'code', lang: 'typescript', value })
    expect(html).toContain('<span class="token comment">/* first\n second */</span>')
    expect(codeHtml(html).replace(/<[^>]*>/g, '')).toBe(value)
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
    expect(codeHtml(html).replace(/<[^>]*>/g, '')).toBe('&lt;script&gt;alert(1)&lt;/script&gt;')
  })

  it('renders empty block code', () => {
    const html = render({ type: 'code', lang: null, meta: null, value: '' })
    expect(codeHtml(html)).toBe('')
    expect(html).toContain('<span class="yozora-code__language">text</span>')
    expect(html).toContain(
      '<div class="yozora-code__line-numbers" aria-hidden="true"><span>1</span></div>',
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
    expect(type === 'code' ? codeHtml(html) : html).toBe(
      type === 'code' ? expected : `<code class="${className}">${expected}</code>`,
    )
    expect(html).not.toContain('<script>')
  })
})
