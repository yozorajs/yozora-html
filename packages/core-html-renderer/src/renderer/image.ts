import type { Image } from '@yozora/ast'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `Image` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#image
 * @see https://www.npmjs.com/package/@yozora/tokenizer-image
 * @see https://www.npmjs.com/package/@yozora/tokenizer-image-reference
 */
export const renderImage: INodeRenderer<Image> = (node, context) => {
  const url: string = context.sanitize(node.url)
  const alt: string = context.sanitize(node.alt)
  const title: string = context.sanitize(node.title || alt)
  return `<img class="yozora-image" alt="${alt}" src="${url}" title="${title}" />`
}
