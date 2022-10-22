import type { AlignType, Table, TableCell, TableRow } from '@yozora/ast'
import type { INodeRenderer } from '../types'

const ColumnAlignTypeMap: Record<string, AlignType> = {
  left: 'left',
  right: 'right',
  center: 'center',
}

/**
 * Render Yozora Markdown AST node `Table` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#table
 * @see https://www.npmjs.com/package/@yozora/tokenizer-table
 */
export const renderTable: INodeRenderer<Table> = (node, context) => {
  const aligns = node.columns.map(col => {
    if (col.align == null) return null
    return ColumnAlignTypeMap[col.align.toLowerCase()] ?? null
  })

  const [tHeadRow, ...tBodyRows] = node.children
  const thead: string =
    `<thead class="yozora-table__thead"><tr class="yozora-table-row">` +
    tHeadRow.children
      .map((th: TableCell, i): string => {
        const align = aligns[i] == null ? '' : ` align="${aligns[i]}"`
        const ths: string = context.renderChildren(th.children)
        return `<th class="yozora-table-cell"${align}>${ths}</th>`
      })
      .join('') +
    '</tr></thead>'

  const tbody: string =
    `<tbody class="yozora-table__tbody">` +
    tBodyRows
      .map((row: TableRow) => {
        const tds: string = row.children
          .map((td: TableCell, i) => {
            const align = aligns[i] == null ? '' : ` align="${aligns[i]}"`
            const ths: string = context.renderChildren(td.children)
            return `<td class="yozora-table-cell"${align}>${ths}</td>`
          })
          .join('')
        return `<tr class="yozora-table-row">${tds}</tr>`
      })
      .join('') +
    '</tbody>'

  return `<table class="yozora-table">${thead}${tbody}</table>`
}
