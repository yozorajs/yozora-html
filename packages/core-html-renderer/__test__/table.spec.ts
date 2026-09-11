import { describe, expect, it } from 'vitest'
import { render, text } from './helper'

describe('renderTable', () => {
  it.each([
    ['left', 'left'],
    ['RIGHT', 'right'],
    ['center', 'center'],
    [null, null],
    ['invalid', null],
  ])('renders header and body alignment %j', (align, expected) => {
    const html = render({
      type: 'table',
      columns: [{ align }],
      children: ['Heading', 'Cell'].map(value => ({
        type: 'tableRow',
        children: [{ type: 'tableCell', children: [text(value)] }],
      })),
    })
    const attribute = expected == null ? '' : ` align="${expected}"`
    expect(html).toBe(
      '<table class="yozora-table"><thead class="yozora-table__thead"><tr class="yozora-table-row">' +
        `<th class="yozora-table-cell"${attribute}><span class="yozora-text">Heading</span></th>` +
        '</tr></thead><tbody class="yozora-table__tbody"><tr class="yozora-table-row">' +
        `<td class="yozora-table-cell"${attribute}><span class="yozora-text">Cell</span></td>` +
        '</tr></tbody></table>',
    )
  })

  it('renders a header-only table with no column alignment metadata', () => {
    expect(
      render({
        type: 'table',
        columns: [],
        children: [{ type: 'tableRow', children: [{ type: 'tableCell', children: [] }] }],
      }),
    ).toBe(
      '<table class="yozora-table"><thead class="yozora-table__thead"><tr class="yozora-table-row"><th class="yozora-table-cell"></th></tr></thead><tbody class="yozora-table__tbody"></tbody></table>',
    )
  })
})
