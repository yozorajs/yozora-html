import type { ImageReference } from '@yozora/ast'
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

  const url: string = context.sanitize(definition.url)
  const alt: string = context.sanitize(definition.label)
  const title: string = context.sanitize(definition.title || alt)
  return `<img class="yozora-image" alt="${alt}" src="${url}" title="${title}" />`
}
