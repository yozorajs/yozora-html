import type { Emphasis, Link, Strong, Text } from '@yozora/ast';
import { EmphasisType, LinkType , StrongType, TextType } from '@yozora/ast'
import { renderChildren } from '../../../jest.setup'
import renderLink from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node: Link = {
      type: LinkType,
      url: 'https://github.com/guanghechen/yozora',
      title: 'yozora',
      children: [
        {
          type: TextType,
          value: 'yozora is cool!',
        } as Text,
      ],
    }
    expect(renderLink(node, renderChildren)).toMatchSnapshot()
  })

  it('basic-2', function () {
    const node: Link = {
      type: LinkType,
      url: 'https://github.com/yozorajs/yozora-html',
      title: 'yozora-html',
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
    expect(renderLink(node, renderChildren)).toMatchSnapshot()
  })
})
