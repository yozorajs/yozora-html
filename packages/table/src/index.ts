import type { Table, TableCell, TableRow, YastNode } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `Table` into HTML string.
 * @param table
 * @param renderChildren
 * @returns
 */
export function renderTable(
  table: Table,
  renderChildren: (nodes: YastNode[]) => string,
): string {
  const { columns } = table
  const aligns = columns.map(col => col.align ?? undefined)
  const [tHeadRow, ...tBodyRows] = table.children

  const thead: string =
    `<thead class="yozora-table__thead"><tr class="yozora-table-row">` +
    tHeadRow.children
      .map((th: TableCell, i): string => {
        const align = aligns[i] == null ? '' : ` align="${aligns[i]}"`
        const ths: string = renderChildren(th.children)
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
