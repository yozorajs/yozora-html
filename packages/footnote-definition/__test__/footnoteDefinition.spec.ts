import type {
  FootnoteDefinition as IFootnoteDefinition,
  Text as IText,
} from '@yozora/ast'
import { renderChildren } from '../../../jest.setup'
import renderFootnoteDefinition from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node: IFootnoteDefinition = {
      type: 'footnoteDefinition',
      identifier: 'bravo',
      label: 'Bravo',
      children: [
        {
          type: 'text',
          value: 'bravo and charlie.',
        } as IText,
      ],
    }

    expect(renderFootnoteDefinition(node, renderChildren)).toMatchSnapshot()
  })

  it('basic-2', function () {
    const nodes: IFootnoteDefinition[] = [
      {
        type: 'footnoteDefinition',
        identifier: 'bravo"',
        label: 'bravo<a>"<b:"></sup>',
        children: [
          {
            type: 'text',
            value: 'bravo and charlie.',
          } as IText,
        ],
      },
      {
        type: 'footnoteDefinition',
        identifier: 'bravo"',
        label: 'bravo<a>"<b:"></sup>',
        children: [],
      },
    ]

    for (const node of nodes) {
      expect(renderFootnoteDefinition(node, renderChildren)).toMatchSnapshot()
    }
  })
})
