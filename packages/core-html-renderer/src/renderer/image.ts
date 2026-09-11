import type { Image } from '@yozora/ast'
import { escapeAttribute } from '../escapeHtml'
import { sanitizeUrl } from '../sanitizeUrl'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `Image` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#image
 * @see https://www.npmjs.com/package/@yozora/tokenizer-image
 * @see https://www.npmjs.com/package/@yozora/tokenizer-image-reference
 */
export const renderImage: INodeRenderer<Image> = node => {
  const url: string = escapeAttribute(sanitizeUrl(node.url))
  const alt: string = escapeAttribute(node.alt)
  const title: string = escapeAttribute(node.title || node.alt)
  return `<img class="yozora-image" alt="${alt}" src="${url}" title="${title}" />`
}
