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
    [undefined, null],
    ['invalid', null],
    ['__proto__', null],
    ['constructor', null],
    ['left" onclick="alert(1)', null],
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

  it.each([
    ['yozora_test_alignment', 'yozora_test_alignment', ''],
    ['1', 'left', ' align="left"'],
  ])('ignores polluted prototype property %j in alignment output', (property, align, expected) => {
    const node = {
      type: 'table',
      columns: [{ align }],
      children: ['Header', 'Body'].map(value => ({
        type: 'tableRow',
        children: [
          { type: 'tableCell', children: [text(value)] },
          { type: 'tableCell', children: [text('Extra')] },
        ],
      })),
    }
    const previous = Object.getOwnPropertyDescriptor(Object.prototype, property)
    let html: string
    Object.defineProperty(Object.prototype, property, {
      configurable: true,
      writable: true,
      value: 'left" onclick="alert(1)',
    })
    try {
      html = render(node)
    } finally {
      if (previous) Object.defineProperty(Object.prototype, property, previous)
      else Reflect.deleteProperty(Object.prototype, property)
    }
    expect(html).toBe(
      '<table class="yozora-table"><thead class="yozora-table__thead"><tr class="yozora-table-row">' +
        `<th class="yozora-table-cell"${expected}><span class="yozora-text">Header</span></th>` +
        '<th class="yozora-table-cell"><span class="yozora-text">Extra</span></th>' +
        '</tr></thead><tbody class="yozora-table__tbody"><tr class="yozora-table-row">' +
        `<td class="yozora-table-cell"${expected}><span class="yozora-text">Body</span></td>` +
        '<td class="yozora-table-cell"><span class="yozora-text">Extra</span></td>' +
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
