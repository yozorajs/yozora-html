import type { Definition, FootnoteDefinition } from '@yozora/ast'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createNodeRendererContext, defaultRendererMap } from '../src'
import { text } from './helper'

afterEach(() => vi.restoreAllMocks())

describe('createNodeRendererContext', () => {
  it('looks up definitions by identifier and keeps contexts independent', () => {
    const definition: Definition = {
      type: 'definition',
      identifier: 'link',
      label: 'Link',
      url: '/target',
      title: undefined,
    }
    const footnote: FootnoteDefinition = {
      type: 'footnoteDefinition',
      identifier: 'note',
      label: '1',
      children: [text('note')],
    }
    const context = createNodeRendererContext({ link: definition }, { note: footnote })
    expect(context.getDefinition('link')).toBe(definition)
    expect(context.getFootnoteDefinition('note')).toBe(footnote)
    expect(context.getDefinition('missing')).toBeUndefined()
    expect(context.getFootnoteDefinition('missing')).toBeUndefined()
    expect(createNodeRendererContext({}, {}).getDefinition('link')).toBeUndefined()
  })

  it('removes HTML tags and script contents while preserving text', () => {
    const context = createNodeRendererContext({}, {})
    expect(context.sanitize('<b>Hello</b><script>alert(1)</script> & world')).toBe(
      'Hello &amp; world',
    )
    expect(context.sanitize('')).toBe('')
  })

  it('renders empty input and preserves sibling order', () => {
    const context = createNodeRendererContext({}, {})
    expect(context.renderChildren([])).toBe('')
    expect(context.renderChildren([text('first'), text('second')])).toBe(
      '<span class="yozora-text">first</span><span class="yozora-text">second</span>',
    )
  })

  it.each([null, undefined])('tolerates missing children from JavaScript callers: %j', nodes => {
    const context = createNodeRendererContext({}, {})
    expect(Reflect.apply(context.renderChildren, context, [nodes])).toBe('')
  })

  it('uses custom renderers recursively without modifying the default map', () => {
    const context = createNodeRendererContext(
      {},
      {},
      {
        ...defaultRendererMap,
        text: node => `[${node.value}]`,
        custom: (node, current) => current.renderChildren(node.children),
      },
    )
    const node = { type: 'custom', children: [text('nested')] }
    expect(context.renderChildren([node])).toBe('[nested]')
    expect(createNodeRendererContext({}, {}).renderChildren([text('nested')])).toContain(
      'yozora-text',
    )
  })

  it('warns about unsupported nodes and continues rendering their siblings', () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const context = createNodeRendererContext({}, {})
    expect(context.renderChildren([{ type: 'unsupported' }, text('kept')])).toBe(
      '<span class="yozora-text">kept</span>',
    )
    expect(warning).toHaveBeenCalledExactlyOnceWith('Cannot find renderer for node unsupported')
  })

  it('omits raw HTML and definition nodes from the output', () => {
    const nodes = [
      { type: 'html', value: '<script>alert(1)</script>' },
      { type: 'definition', identifier: 'link', label: 'Link', url: '/target', title: undefined },
    ]
    expect(createNodeRendererContext({}, {}).renderChildren(nodes)).toBe('')
  })
})

describe('defaultRendererMap._fallback', () => {
  it('returns empty output and includes the unsupported node in its warning', () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const node = { type: 'extension' }
    expect(defaultRendererMap._fallback(node, createNodeRendererContext({}, {}))).toBe('')
    expect(warning).toHaveBeenCalledExactlyOnceWith(
      'Cannot find render for `extension` type node:',
      node,
    )
  })
})
