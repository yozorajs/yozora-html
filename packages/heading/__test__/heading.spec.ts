import type { Emphasis, Heading, Strong, Text } from '@yozora/ast'
import { EmphasisType, HeadingType, StrongType, TextType } from '@yozora/ast'
import { renderChildren } from '../../../jest.setup'
import renderHeading from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node: Heading = {
      type: HeadingType,
      depth: 1,
      children: [
        {
          type: TextType,
          value: 'yozora is cool!',
        } as Text,
      ],
    }
    expect(renderHeading(node, renderChildren)).toMatchSnapshot()
  })

  it('basic-2', function () {
    const node: Heading = {
      type: HeadingType,
      depth: 6,
      identifier: 'waw',
      children: [
        {
          type: EmphasisType,
          children: [
            {
              type: TextType,
              value: 'Hello',
            } as Text,
          ],
        } as Emphasis,
        {
          type: TextType,
          value: ', ',
        } as Text,
        {
          type: StrongType,
          children: [
            {
              type: TextType,
              value: 'World',
            } as Text,
          ],
        } as Strong,
      ],
    }
    expect(renderHeading(node, renderChildren)).toMatchSnapshot()
  })
})
