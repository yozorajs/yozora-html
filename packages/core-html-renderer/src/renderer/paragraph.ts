import type { Paragraph } from '@yozora/ast'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `Paragraph` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#paragraph
 * @see https://www.npmjs.com/package/@yozora/tokenizer-paragraph
 */
export const renderParagraph: INodeRenderer<Paragraph> = (node, context) => {
  const children: string = context.renderChildren(node.children)
  return `<p class="yozora-paragraph">${children}</p>`
}
