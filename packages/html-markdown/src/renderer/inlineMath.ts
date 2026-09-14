import type { InlineMath } from '@yozora/ast'
import { escapeHtml } from '../escapeHtml'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `InlineMath` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#inlinemath
 * @see https://www.npmjs.com/package/@yozora/tokenizer-inline-math
 */
export const renderInlineMath: INodeRenderer<InlineMath> = node => {
  const value: string = escapeHtml(node.value)
  return `<span class="yozora-inline-math">${value}</span>`
}
