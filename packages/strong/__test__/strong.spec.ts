import type { Strong as IStrong } from '@yozora/ast'
import { renderChildren } from '../../../jest.setup'
import renderStrong from '../src'

describe('snapshot', function () {
  it('basic-1', function () {
    const node = {
      type: 'strong',
      children: [
        {
          type: 'text',
          value: 'yozora is cool!',
        },
      ],
    }
    expect(renderStrong(node as IStrong, renderChildren)).toMatchSnapshot()
  })

  it('basic-2', function () {
    const node = {
      type: 'strong',
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
    expect(renderStrong(node as IStrong, renderChildren)).toMatchSnapshot()
  })
})
