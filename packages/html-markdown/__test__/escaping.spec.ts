import type { Definition } from '@yozora/ast'
import { describe, expect, it } from 'vitest'
import { createNodeRendererContext } from '../src'
import { sanitizeUrl } from '../src/sanitizeUrl'
import { render, text } from './helper'

describe('attribute escaping', () => {
  it.each(['link', 'image', 'linkReference', 'imageReference'])(
    'keeps quotes inside %s attributes',
    type => {
      const payload = 'x" onerror="alert(1)'
      const definition: Definition = {
        type: 'definition',
        identifier: 'ref',
        label: 'Reference',
        url: '/image.png',
        title: payload,
      }
      const context = createNodeRendererContext({ ref: definition }, {})
      const node = {
        type,
        identifier: 'ref',
        url: '/image.png',
        alt: payload,
        title: payload,
        children: [text('link')],
      }
      const html = context.renderChildren([node])
      expect(html).not.toContain(' onerror="')
      expect(html).toContain('title="x&quot; onerror=&quot;alert(1)"')
      if (type.startsWith('image')) expect(html).toContain('alt="x&quot; onerror=&quot;alert(1)"')
    },
  )

  it('escapes query separators once and protects URL attribute quotes', () => {
    const url = '/search?q="hello"&page=1'
    expect(render({ type: 'link', url, children: [] })).toBe(
      '<a class="yozora-link" href="/search?q=&quot;hello&quot;&amp;page=1" title="/search?q=&quot;hello&quot;&amp;page=1" target="_blank" rel="noopener,noreferrer"></a>',
    )
  })
})

describe('URL protocols', () => {
  it.each([
    'javascript:alert(1)',
    'JaVaScRiPt:alert(1)',
    ' \tjava\nscript:alert(1)',
    'vbscript:alert(1)',
    'data:text/html,example',
    'file:///etc/passwd',
  ])('rejects %j', url => {
    expect(sanitizeUrl(url)).toBe('')
  })

  it.each([
    'https://example.com',
    'HTTP://example.com',
    'mailto:hello@example.com',
    'tel:+123',
    'ftp://example.com',
    '/relative/path',
    '../path',
    '#section',
    '//example.com/path',
    'path?q=javascript:foo',
    '',
  ])('preserves %j', url => {
    expect(sanitizeUrl(url)).toBe(url)
  })

  it.each(['link', 'image', 'linkReference', 'imageReference'])(
    'blocks unsafe URLs in %s output',
    type => {
      const url = 'javascript:alert(1)'
      const definition: Definition = {
        type: 'definition',
        identifier: 'ref',
        label: 'Reference',
        url,
      }
      const context = createNodeRendererContext({ ref: definition }, {})
      const node = { type, identifier: 'ref', url, alt: 'Image', title: 'Title', children: [] }
      expect(context.renderChildren([node])).toContain(
        type.startsWith('image') ? 'src=""' : 'href=""',
      )
    },
  )
})

it('keeps inline code within the paragraph using phrasing HTML', () => {
  expect(
    render({
      type: 'paragraph',
      children: [text('before'), { type: 'inlineCode', value: '<code>' }, text('after')],
    }),
  ).toBe(
    '<p class="yozora-paragraph"><span class="yozora-text">before</span><code class="yozora-inline-code">&lt;code&gt;</code><span class="yozora-text">after</span></p>',
  )
})
