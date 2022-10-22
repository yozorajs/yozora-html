import type { LinkReference } from '@yozora/ast'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `LinkReference` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#linkreference
 * @see https://www.npmjs.com/package/@yozora/tokenizer-link
 * @see https://www.npmjs.com/package/@yozora/tokenizer-link-reference
 */
export const renderLinkReference: INodeRenderer<LinkReference> = (node, context) => {
  const definition = context.getDefinition(node.identifier)
  if (definition == null) return ''

  const url: string = context.sanitize(definition.url)
  const title: string = context.sanitize(definition.title || url)
  const children: string = context.renderChildren(node.children)
  return `<a class="yozora-link" href="${url}" title="${title}" target="_blank" rel="noopener,noreferrer">${children}</a>`
}
