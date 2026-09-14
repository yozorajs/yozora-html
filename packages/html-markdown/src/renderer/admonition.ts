import type { Admonition } from '@yozora/ast'
import { renderAdmonition as baseRenderAdmonition } from '@yozora/html-admonition'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `Admonition` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#admonition
 * @see https://www.npmjs.com/package/@yozora/tokenizer-admonition
 */
export const renderAdmonition: INodeRenderer<Admonition> = (node, context) => {
  return baseRenderAdmonition(node, context)
}
