import type { Table } from '@yozora/ast'
import { renderChildren } from '../../../jest.setup'
import renderTable from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node = {
      type: 'table',
      columns: [
        {
          align: 'center',
        },
        {
          align: 'right',
        },
        {
          align: null,
        },
      ],
      children: [
        {
          type: 'tableRow',
          children: [
            {
              type: 'tableCell',
              children: [
                {
                  type: 'text',
                  value: 'abc',
                },
              ],
            },
            {
              type: 'tableCell',
              children: [
                {
                  type: 'text',
                  value: 'defghi',
                },
              ],
            },
            {
              type: 'tableCell',
              children: [
                {
                  type: 'text',
                  value: 'xyz',
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          children: [
            {
              type: 'tableCell',
              children: [
                {
                  type: 'text',
                  value: 'bar',
                },
              ],
            },
            {
              type: 'tableCell',
              children: [
                {
                  type: 'text',
                  value: 'baz',
                },
              ],
            },
            {
              type: 'tableCell',
              children: [
                {
                  type: 'text',
                  value: 'defghi',
                },
              ],
            },
          ],
        },
      ],
    }
    expect(renderTable(node as Table, renderChildren)).toMatchSnapshot()
  })
})
