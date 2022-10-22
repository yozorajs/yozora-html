import type { InlineMath } from '@yozora/ast'
import type { INodeRenderer } from '../../../core-html-renderer/src/types'

/**
 * Render Yozora Markdown AST node `InlineMath` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#inlinemath
 * @see https://www.npmjs.com/package/@yozora/tokenizer-inline-math
 */
export const renderInlineMath: INodeRenderer<InlineMath> = (node, context) => {
  const value: string = context.sanitize(node.value)
  return `<span class="yozora-inline-math">${value}</span>`
}
