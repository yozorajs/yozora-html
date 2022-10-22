import type { List } from '@yozora/ast'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `List` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#list
 * @see https://www.npmjs.com/package/@yozora/tokenizer-list
 */
export const renderList: INodeRenderer<List> = (node, context) => {
  const children: string = context.renderChildren(node.children)
  if (node.ordered) {
    const { start = 1 } = node
    return `<ol class="yozora-list" start="${Number(start)}">${children}</ol>`
  }
  return `<ul class="yozora-list">${children}</ul>`
}
