import type { Emphasis, Strong, Text } from '@yozora/ast';
import { EmphasisType , StrongType, TextType } from '@yozora/ast'
import { renderChildren } from '../../../jest.setup'
import renderEmphasis from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node: Emphasis = {
      type: EmphasisType,
      children: [
        {
          type: TextType,
          value: 'yozora is cool!',
        } as Text,
      ],
    }
    expect(renderEmphasis(node, renderChildren)).toMatchSnapshot()
  })

  it('basic-2', function () {
    const node: Emphasis = {
      type: EmphasisType,
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
    expect(renderEmphasis(node, renderChildren)).toMatchSnapshot()
  })
})
