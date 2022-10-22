import type { Delete } from '@yozora/ast'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `Delete` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#delete
 * @see https://www.npmjs.com/package/@yozora/tokenizer-delete
 */
export const renderDelete: INodeRenderer<Delete> = (node, context) => {
  const children: string = context.renderChildren(node.children)
  return `<del class="yozora-delete">${children}</del>`
}
