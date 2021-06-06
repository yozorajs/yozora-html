import type { Emphasis, Paragraph, Strong, Text } from '@yozora/ast'
import { EmphasisType, ParagraphType, StrongType, TextType } from '@yozora/ast'
import { renderChildren } from '../../../jest.setup'
import renderParagraph from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node: Paragraph = {
      type: ParagraphType,
      children: [
        {
          type: TextType,
          value: 'yozora is cool!',
        } as Text,
      ],
    }
    expect(renderParagraph(node, renderChildren)).toMatchSnapshot()
  })

  it('basic-2', function () {
    const node: Paragraph = {
      type: ParagraphType,
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
    expect(renderParagraph(node, renderChildren)).toMatchSnapshot()
  })
})
