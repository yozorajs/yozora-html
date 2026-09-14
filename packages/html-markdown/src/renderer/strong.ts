import type { Strong } from '@yozora/ast'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `Strong` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#strong
 * @see https://www.npmjs.com/package/@yozora/tokenizer-emphasis
 */
export const renderStrong: INodeRenderer<Strong> = (node, context) => {
  const children: string = context.renderChildren(node.children)
  return `<strong class="yozora-strong">${children}</strong>`
}
