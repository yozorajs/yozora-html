import type { Emphasis, Text } from '@yozora/ast'
import { EmphasisType, TextType } from '@yozora/ast'
import { renderChildren } from '../../../jest.setup'
import renderEmphasis from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const emphasis: Emphasis = {
      type: EmphasisType,
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

    expect(renderEmphasis(emphasis, renderChildren)).toMatchSnapshot()
  })
})
