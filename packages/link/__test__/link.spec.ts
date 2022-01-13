import type { Link as ILink } from '@yozora/ast'
import { renderChildren } from '../../../jest.setup'
import renderLink from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node = {
      type: 'link',
      url: 'https://github.com/guanghechen/yozora',
      title: 'yozora',
      children: [
        {
          type: 'text',
          value: 'yozora is cool!',
        },
      ],
    }
    expect(renderLink(node as ILink, renderChildren)).toMatchSnapshot()
  })

  it('basic-2', function () {
    const node = {
      type: 'link',
      url: 'https://github.com/yozorajs/yozora-html',
      title: 'yozora-html',
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
    expect(renderLink(node as ILink, renderChildren)).toMatchSnapshot()
  })
})
