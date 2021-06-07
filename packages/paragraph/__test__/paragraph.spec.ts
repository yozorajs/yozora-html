import type { Paragraph } from '@yozora/ast'
import { renderChildren } from '../../../jest.setup'
import renderParagraph from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node = {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: 'yozora is cool!',
        },
      ],
    }
    expect(renderParagraph(node as Paragraph, renderChildren)).toMatchSnapshot()
  })

  it('basic-2', function () {
    const node = {
      type: 'paragraph',
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
    expect(renderParagraph(node as Paragraph, renderChildren)).toMatchSnapshot()
  })
})
