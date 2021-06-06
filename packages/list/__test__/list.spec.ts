import type { List } from '@yozora/ast'
import { renderChildren } from '../../../jest.setup'
import renderList from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node = {
      type: 'list',
      ordered: false,
      marker: 45,
      spread: true,
      children: [
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: 'a',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: 'b',
                },
              ],
            },
          ],
        },
      ],
    }
    expect(renderList(node as List, renderChildren)).toMatchSnapshot()
  })

  it('todo', function () {
    const node = {
      type: 'list',
      ordered: false,
      marker: 45,
      spread: false,
      children: [
        {
          type: 'listItem',
          status: 'todo',
          children: [
            {
              type: 'text',
              value: 'foo',
            },
          ],
        },
        {
          type: 'listItem',
          status: 'done',
          children: [
            {
              type: 'text',
              value: 'bar',
            },
          ],
        },
      ],
    }
    expect(renderList(node as List, renderChildren)).toMatchSnapshot()
  })

  it('ordered', function () {
    const node = {
      type: 'list',
      ordered: true,
      start: 1,
      marker: 46,
      spread: false,
      children: [
        {
          type: 'listItem',
          children: [
            {
              type: 'text',
              value: 'a',
            },
          ],
        },
        {
          type: 'listItem',
          children: [
            {
              type: 'text',
              value: 'b',
            },
          ],
        },
        {
          type: 'listItem',
          children: [
            {
              type: 'text',
              value: 'c',
            },
          ],
        },
      ],
    }
    expect(renderList(node as List, renderChildren)).toMatchSnapshot()
  })
})
