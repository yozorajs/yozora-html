import type { IDelete } from '@yozora/ast'
import { renderChildren } from '../../../jest.setup'
import renderDelete from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node = {
      type: 'delete',
      children: [
        {
          type: 'text',
          value: 'yozora is cool!',
        },
      ],
    }
    expect(renderDelete(node as IDelete, renderChildren)).toMatchSnapshot()
  })

  it('basic-2', function () {
    const node = {
      type: 'delete',
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
    expect(renderDelete(node as IDelete, renderChildren)).toMatchSnapshot()
  })
})
