import { TaskStatus } from '@yozora/ast'
import { describe, expect, it } from 'vitest'
import { render, text } from './helper'

describe('list renderers', () => {
  it('renders an unordered list with nested items', () => {
    expect(
      render({
        type: 'list',
        ordered: false,
        children: [{ type: 'listItem', children: [text('item')] }],
      }),
    ).toBe(
      '<ul class="yozora-list"><li class="yozora-list-item"><span class="yozora-text">item</span></li></ul>',
    )
  })

  it.each([undefined, 0, 3])('renders an ordered list starting at %j', start => {
    expect(render({ type: 'list', ordered: true, start, children: [] })).toBe(
      `<ol class="yozora-list" start="${start ?? 1}"></ol>`,
    )
  })

  it.each([
    [undefined, ''],
    [TaskStatus.DOING, ''],
    [TaskStatus.TODO, '<input disabled="" type="checkbox" /> '],
    [TaskStatus.DONE, '<input checked="" disabled="" type="checkbox" /> '],
  ])('renders list item status %j', (status, checkbox) => {
    expect(render({ type: 'listItem', status, children: [text('task')] })).toBe(
      `<li class="yozora-list-item">${checkbox}<span class="yozora-text">task</span></li>`,
    )
  })
})
