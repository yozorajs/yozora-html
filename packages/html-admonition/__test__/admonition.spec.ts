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

describe('snapshot', function () {
  it('basic', function () {
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
