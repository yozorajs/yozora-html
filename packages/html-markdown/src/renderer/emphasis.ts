import type { Emphasis } from '@yozora/ast'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `Emphasis` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#emphasis
 * @see https://www.npmjs.com/package/@yozora/tokenizer-emphasis
 */
export const renderEmphasis: INodeRenderer<Emphasis> = (node, context) => {
  const children: string = context.renderChildren(node.children)
  return `<em class="yozora-emphasis">${children}</em>`
}
