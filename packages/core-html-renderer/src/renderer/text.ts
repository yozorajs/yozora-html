import type { Text } from '@yozora/ast'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `Text` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#text
 * @see https://www.npmjs.com/package/@yozora/tokenizer-text
 */
export const renderText: INodeRenderer<Text> = (node, context) => {
  const value: string = context.sanitize(node.value)
  return `<span class="yozora-text">${value}</span>`
}
