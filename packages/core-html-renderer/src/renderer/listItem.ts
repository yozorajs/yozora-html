import type { ListItem } from '@yozora/ast'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `ListItem` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#listitem
 * @see https://www.npmjs.com/package/@yozora/tokenizer-list
 */
export const renderListItem: INodeRenderer<ListItem> = (node, context) => {
  const children: string = context.renderChildren(node.children)

  let checkbox = ''
  if (node.status != null) {
    switch (node.status) {
      case 'todo':
        checkbox = '<input disabled="" type="checkbox" /> '
        break
      case 'done':
        checkbox = '<input checked="" disabled="" type="checkbox" /> '
        break
    }
  }
  return `<li class="yozora-list-item">${checkbox}${children}</li>`
}
