import type { Emphasis, Strong, Text } from '@yozora/ast';
import { EmphasisType , StrongType, TextType } from '@yozora/ast'
import { renderChildren } from '../../../jest.setup'
import renderStrong from '../src'

describe('snapshot', function () {
  it('basic-1', function () {
    const node: Strong = {
      type: StrongType,
      children: [
        {
          type: TextType,
          value: 'yozora is cool!',
        } as Text,
      ],
    }
    expect(renderStrong(node, renderChildren)).toMatchSnapshot()
  })

  it('basic-2', function () {
    const node: Strong = {
      type: StrongType,
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
    expect(renderStrong(node, renderChildren)).toMatchSnapshot()
  })
})
