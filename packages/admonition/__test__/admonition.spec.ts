import type { Admonition } from '@yozora/ast'
import { renderChildren } from '../../../jest.setup'
import renderAdmonition from '../src'

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
    expect(
      renderAdmonition(node as Admonition, renderChildren),
    ).toMatchSnapshot()
  })
})