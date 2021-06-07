import type { Heading } from '@yozora/ast'
import { renderChildren } from '../../../jest.setup'
import renderHeading from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node = {
      type: 'heading',
      depth: 1,
      children: [
        {
          type: 'text',
          value: 'yozora is cool!',
        },
      ],
    }
    expect(renderHeading(node as Heading, renderChildren)).toMatchSnapshot()
  })

  it('basic-2', function () {
    const node = {
      type: 'heading',
      depth: 6,
      identifier: 'waw',
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
    expect(renderHeading(node as Heading, renderChildren)).toMatchSnapshot()
  })
})
