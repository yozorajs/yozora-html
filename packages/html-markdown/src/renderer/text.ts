import type { Text } from '@yozora/ast'
import { escapeHtml } from '../escapeHtml'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `Text` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#text
 * @see https://www.npmjs.com/package/@yozora/tokenizer-text
 */
export const renderText: INodeRenderer<Text> = node => {
  const value: string = escapeHtml(node.value)
  return `<span class="yozora-text">${value}</span>`
}
