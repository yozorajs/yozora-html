import type { Math } from '@yozora/ast'
import type { INodeRenderer } from '@yozora/core-html-renderer'

/**
 * Render Yozora Markdown AST node `Math` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#math
 * @see https://www.npmjs.com/package/@yozora/tokenizer-math
 */
export const renderMath: INodeRenderer<Math> = (node, context) => {
  const value: string = context.sanitize(node.value)
  return `<div class="yozora-math">${value}</div>`
}
