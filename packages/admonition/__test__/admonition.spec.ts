import type { Admonition as IAdmonition } from '@yozora/ast'
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
    expect(renderAdmonition(node as IAdmonition, renderChildren)).toMatchSnapshot()
  })
})
