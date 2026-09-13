import type { Math as MathNode } from '@yozora/ast'
import type { INodeRenderer } from '@yozora/core-html-renderer'
import { escapeHtml } from '@yozora/core-html-renderer'

/**
 * Render Yozora Markdown AST node `Math` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#math
 * @see https://www.npmjs.com/package/@yozora/tokenizer-math
 */
export const renderMath: INodeRenderer<MathNode> = node => {
  const value: string = escapeHtml(node.value)
  return `<div class="yozora-math">${value}</div>`
}
