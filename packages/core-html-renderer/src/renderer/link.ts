import type { Link } from '@yozora/ast'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `Link` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#link
 * @see https://www.npmjs.com/package/@yozora/tokenizer-link
 * @see https://www.npmjs.com/package/@yozora/tokenizer-link-reference
 */
export const renderLink: INodeRenderer<Link> = (node, context) => {
  const url: string = context.sanitize(node.url)
  const title: string = context.sanitize(node.title || url)
  const children: string = context.renderChildren(node.children)
  return `<a class="yozora-link" href="${url}" title="${title}" target="_blank" rel="noopener,noreferrer">${children}</a>`
}
