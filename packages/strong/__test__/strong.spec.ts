import type { Strong, Text } from '@yozora/ast'
import { StrongType, TextType } from '@yozora/ast'
import { renderChildren } from '../../../jest.setup'
import renderStrong from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const strong: Strong = {
      type: StrongType,
      children: [
        {
          type: TextType,
          value: 'Hello',
        } as Text,
        {
          type: TextType,
          value: 'World',
        } as Text,
      ],
    }

    expect(renderStrong(strong, renderChildren)).toMatchSnapshot()
  })
})
