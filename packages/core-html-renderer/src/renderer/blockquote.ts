import type { Blockquote } from '@yozora/ast'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `Blockquote` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#blockquote
 * @see https://www.npmjs.com/package/@yozora/tokenizer-blockquote
 */
export const renderBlockquote: INodeRenderer<Blockquote> = (node, context) => {
  const children: string = context.renderChildren(node.children)
  return `<blockquote class="yozora-blockquote">${children}</blockquote>`
}
