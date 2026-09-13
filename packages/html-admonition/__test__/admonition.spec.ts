import type { Admonition as IAdmonition } from '@yozora/ast'
import { describe, expect, it } from 'vitest'
import { context } from 'vitest.setup'
import renderAdmonition from '../src'

it.each([
  ['default', 'note', 'NOTE'],
  [' NOTE ', 'note', 'NOTE'],
  ['important', 'info', 'INFO'],
  ['info', 'info', 'INFO'],
  ['success', 'success', 'SUCCESS'],
  ['tip', 'success', 'SUCCESS'],
  ['warning', 'warning', 'CAUTION'],
  ['caution', 'warning', 'CAUTION'],
  ['error', 'danger', 'DANGER'],
  ['danger', 'danger', 'DANGER'],
  ['custom', 'custom', ''],
  ['invalid keyword', '', ''],
])('renders the default title and class for %s', (keyword, modifier, title) => {
  const html = renderAdmonition({ type: 'admonition', keyword, title: [], children: [] }, context)
  expect(html).toContain(`class="yozora-admonition yozora-admonition--${modifier}"`)
  expect(html).toContain(`<span class="yozora-admonition__heading-title">${title}</span>`)
})

describe('renderAdmonition', () => {
  it('uses a rendered custom title instead of the keyword default', () => {
    const title = { type: 'strong', children: [{ type: 'text', value: 'Custom' }] }
    const node: IAdmonition = {
      type: 'admonition',
      keyword: 'warning',
      title: [title],
      children: [],
    }
    const html = renderAdmonition(node, context)
    expect(html).toContain(
      '<strong class="yozora-strong"><span class="yozora-text">Custom</span></strong>',
    )
    expect(html).not.toContain('>CAUTION<')
  })

  it('strips markup from the keyword and renders sanitized children', () => {
    const child = { type: 'text', value: '<script>removed</script>Safe & sound' }
    const node: IAdmonition = {
      type: 'admonition',
      keyword: '<b>note</b>',
      title: [],
      children: [child],
    }
    const html = renderAdmonition(node, context)
    expect(html).toContain('yozora-admonition--note')
    expect(html).toContain(
      '<span class="yozora-text">&lt;script&gt;removed&lt;/script&gt;Safe &amp; sound</span>',
    )
    expect(html).not.toContain('<script>')
  })
})

describe('snapshot', () => {
  it('basic', () => {
    const node = {
      type: 'admonition',
      keyword: 'note',
      title: [
        {
          type: 'text',
          value: 'optional title',
        },
      ],
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              value: 'some content',
            },
          ],
        },
      ],
    }
    expect(renderAdmonition(node as IAdmonition, context)).toMatchSnapshot()
  })
})
