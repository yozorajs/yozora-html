import type { Link } from '@yozora/ast'
import { escapeAttribute } from '../escapeHtml'
import { sanitizeUrl } from '../sanitizeUrl'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `Link` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#link
 * @see https://www.npmjs.com/package/@yozora/tokenizer-link
 * @see https://www.npmjs.com/package/@yozora/tokenizer-link-reference
 */
export const renderLink: INodeRenderer<Link> = (node, context) => {
  const url: string = escapeAttribute(sanitizeUrl(node.url))
  const title: string = escapeAttribute(node.title || node.url)
  const children: string = context.renderChildren(node.children)
  return `<a class="yozora-link" href="${url}" title="${title}" target="_blank" rel="noopener,noreferrer">${children}</a>`
}
