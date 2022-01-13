import type { Blockquote as IBlockquote } from '@yozora/ast'
import { renderChildren } from '../../../jest.setup'
import renderBlockquote from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node = {
      type: 'blockquote',
      children: [
        {
          type: 'text',
          value: 'yozora is cool!',
        },
      ],
    }
    expect(
      renderBlockquote(node as IBlockquote, renderChildren),
    ).toMatchSnapshot()
  })

  it('basic-2', function () {
    const node = {
      type: 'blockquote',
      children: [
        {
          type: 'emphasis',
          children: [
            {
              type: 'text',
              value: 'Hello',
            },
          ],
        },
        {
          type: 'text',
          value: ', ',
        },
        {
          type: 'strong',
          children: [
            {
              type: 'text',
              value: 'World',
            },
          ],
        },
      ],
    }
    expect(
      renderBlockquote(node as IBlockquote, renderChildren),
    ).toMatchSnapshot()
  })
})
