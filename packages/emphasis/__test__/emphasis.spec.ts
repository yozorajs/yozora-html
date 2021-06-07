import type { Emphasis } from '@yozora/ast'
import { renderChildren } from '../../../jest.setup'
import renderEmphasis from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node = {
      type: 'emphasis',
      children: [
        {
          type: 'text',
          value: 'yozora is cool!',
        },
      ],
    }
    expect(renderEmphasis(node as Emphasis, renderChildren)).toMatchSnapshot()
  })

  it('basic-2', function () {
    const node = {
      type: 'emphasis',
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
    expect(renderEmphasis(node as Emphasis, renderChildren)).toMatchSnapshot()
  })
})
