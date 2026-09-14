import { describe, expect, it } from 'vitest'
import { render, text } from './helper'

describe('renderTable', () => {
  it('preserves row and column order with distinct column alignments', () => {
    const html = render({
      type: 'table',
      columns: [{ align: 'left' }, { align: 'center' }, { align: 'right' }],
      children: [
        ['Name', 'Quantity', 'Price'],
        ['Apple', '2', '$3'],
        ['Pear', '4', '$5'],
      ].map(values => ({
        type: 'tableRow',
        children: values.map(value => ({ type: 'tableCell', children: [text(value)] })),
      })),
    })
    expect(html).toBe(
      '<table class="yozora-table"><thead class="yozora-table__thead"><tr class="yozora-table-row">' +
        '<th class="yozora-table-cell" align="left"><span class="yozora-text">Name</span></th>' +
        '<th class="yozora-table-cell" align="center"><span class="yozora-text">Quantity</span></th>' +
        '<th class="yozora-table-cell" align="right"><span class="yozora-text">Price</span></th>' +
        '</tr></thead><tbody class="yozora-table__tbody"><tr class="yozora-table-row">' +
        '<td class="yozora-table-cell" align="left"><span class="yozora-text">Apple</span></td>' +
        '<td class="yozora-table-cell" align="center"><span class="yozora-text">2</span></td>' +
        '<td class="yozora-table-cell" align="right"><span class="yozora-text">$3</span></td>' +
        '</tr><tr class="yozora-table-row">' +
        '<td class="yozora-table-cell" align="left"><span class="yozora-text">Pear</span></td>' +
        '<td class="yozora-table-cell" align="center"><span class="yozora-text">4</span></td>' +
        '<td class="yozora-table-cell" align="right"><span class="yozora-text">$5</span></td>' +
        '</tr></tbody></table>',
    )
  })

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
