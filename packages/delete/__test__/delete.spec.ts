import type { Delete, Emphasis, Strong, Text } from '@yozora/ast'
import { DeleteType, EmphasisType, StrongType, TextType } from '@yozora/ast'
import { renderChildren } from '../../../jest.setup'
import renderDelete from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node: Delete = {
      type: DeleteType,
      children: [
        {
          type: TextType,
          value: 'yozora is cool!',
        } as Text,
      ],
    }
    expect(renderDelete(node, renderChildren)).toMatchSnapshot()
  })

  it('basic-2', function () {
    const node: Delete = {
      type: DeleteType,
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
    expect(renderDelete(node, renderChildren)).toMatchSnapshot()
  })
})
