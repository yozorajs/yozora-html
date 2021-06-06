import type { Blockquote, Emphasis, Strong, Text } from '@yozora/ast'
import { BlockquoteType, EmphasisType, StrongType, TextType } from '@yozora/ast'
import { renderChildren } from '../../../jest.setup'
import renderBlockquote from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node: Blockquote = {
      type: BlockquoteType,
      children: [
        {
          type: TextType,
          value: 'yozora is cool!',
        } as Text,
      ],
    }
    expect(renderBlockquote(node, renderChildren)).toMatchSnapshot()
  })

  it('basic-2', function () {
    const node: Blockquote = {
      type: BlockquoteType,
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
    expect(renderBlockquote(node, renderChildren)).toMatchSnapshot()
  })
})
