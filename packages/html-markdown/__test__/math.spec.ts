import { describe, expect, it } from 'vitest'
import { createNodesRendererContext } from '../src'

describe('math renderers', () => {
  it.each([
    ['math', 'div', 'yozora-math'],
    ['inlineMath', 'span', 'yozora-inline-math'],
  ])('renders %s and escapes embedded HTML without losing source text', (type, tag, className) => {
    const context = createNodesRendererContext({}, {})
    const node = { type, value: '<script>alert(1)</script>x & y' }
    expect(context.renderChildren([node])).toBe(
      `<${tag} class="${className}">&lt;script&gt;alert(1)&lt;/script&gt;x &amp; y</${tag}>`,
    )
    const empty = { ...node, value: '' }
    expect(context.renderChildren([empty])).toBe(`<${tag} class="${className}"></${tag}>`)
  })
})
