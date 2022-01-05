import type { IList, IYastNode } from '@yozora/ast'
import { renderListItem } from './list-item'

/**
 * Render Yozora Markdown AST node `IList` into HTML string.
 * @param list
 * @param renderChildren
 * @returns
 */
export function renderList(
  list: IList,
  renderChildren: (nodes: IYastNode[]) => string,
): string {
  const { ordered } = list
  const children: string = list.children
    .map(item => renderListItem(item, renderChildren))
    .join('')

  if (ordered) {
    const { start = 1 } = list
    return `<ol class="yozora-list" start="${Number(start)}">${children}</ol>`
  }
  return `<ul class="yozora-list">${children}</ul>`
}

export default renderList
