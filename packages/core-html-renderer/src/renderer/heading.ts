import type { Heading } from '@yozora/ast'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `Heading` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#heading
 * @see https://www.npmjs.com/package/@yozora/tokenizer-heading
 * @see https://www.npmjs.com/package/@yozora/tokenizer-setext-heading
 */
export const renderHeading: INodeRenderer<Heading> = (node, context) => {
  const depth = Number(node.depth)
  const H = `h${depth}`
  const children: string = context.renderChildren(node.children)
  return `<${H} class="yozora-heading">${children}</${H}>`
}
