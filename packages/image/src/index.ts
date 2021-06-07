import type { Image } from '@yozora/ast'
import sanitize from 'sanitize-html'

/**
 * Render Yozora Markdown AST node `Image` into HTML string.
 * @param image
 * @returns
 */
export function renderImage(image: Image): string {
  const url: string = sanitize(image.url, { allowedTags: [] })
  const alt: string = sanitize(image.alt, { allowedTags: [] })
  const title: string = sanitize(image.title || alt, { allowedTags: [] })
  return `<img class="yozora-image" alt="${alt} src="${url}" title="${title}"`
}

export default renderImage
