import type { ImageReference } from '@yozora/ast'
import { escapeAttribute } from '../escapeHtml'
import { sanitizeUrl } from '../sanitizeUrl'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `ImageReference` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#imageReference
 * @see https://www.npmjs.com/package/@yozora/tokenizer-image
 * @see https://www.npmjs.com/package/@yozora/tokenizer-image-reference
 */
export const renderImageReference: INodeRenderer<ImageReference> = (node, context) => {
  const definition = context.getDefinition(node.identifier)
  if (definition == null) return ''

  const url: string = escapeAttribute(sanitizeUrl(definition.url))
  const alt: string = escapeAttribute(node.alt)
  const title: string = escapeAttribute(definition.title || node.alt)
  return `<img class="yozora-image" alt="${alt}" src="${url}" title="${title}" />`
}
