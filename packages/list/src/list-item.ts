import type { ListItem, YastNode } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `List` into HTML string.
 * @param list
 * @param renderChildren
 * @returns
 */
export function renderListItem(
  listItem: ListItem,
  renderChildren: (nodes: YastNode[]) => string,
): string {
  const { status } = listItem
  const children: string = renderChildren(listItem.children)

  let checkbox = ''
  if (status != null) {
    switch (status) {
      case 'todo':
        checkbox = `<input disabled="" type="checkbox" /> `
        break
      case 'done':
        checkbox = `<input checked="" disabled="" type="checkbox" /> `
        break
    }
  }
  return `<li class="yozora-list-item">${checkbox}${children}</li>`
}

export default renderListItem
