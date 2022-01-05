import type { ITable, ITableCell, ITableRow, IYastNode } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `ITable` into HTML string.
 * @param table
 * @param renderChildren
 * @returns
 */
export function renderTable(
  table: ITable,
  renderChildren: (nodes: IYastNode[]) => string,
): string {
  const { columns } = table
  const aligns = columns.map(col => {
    if (col.align == null) return null
    switch (col.align.toLowerCase()) {
      case 'left':
        return 'left'
      case 'center':
        return 'center'
      case 'right':
        return 'right'
      default:
        return null
    }
  })
  const [tHeadRow, ...tBodyRows] = table.children

  const thead: string =
    `<thead class="yozora-table__thead"><tr class="yozora-table-row">` +
    tHeadRow.children
      .map((th: ITableCell, i): string => {
        const align = aligns[i] == null ? '' : ` align="${aligns[i]}"`
        const ths: string = renderChildren(th.children)
        return `<th class="yozora-table-cell"${align}>${ths}</th>`
      })
      .join('') +
    '</tr></thead>'

  const tbody: string =
    `<tbody class="yozora-table__tbody">` +
    tBodyRows
      .map((row: ITableRow) => {
        const tds: string = row.children
          .map((td: ITableCell, i) => {
            const align = aligns[i] == null ? '' : ` align="${aligns[i]}"`
            const ths: string = renderChildren(td.children)
            return `<td class="yozora-table-cell"${align}>${ths}</td>`
          })
          .join('')
        return `<tr class="yozora-table-row">${tds}</tr>`
      })
      .join('') +
    '</tbody>'

  return `<table class="yozora-table-item">${thead}${tbody}</table>`
}

export default renderTable
