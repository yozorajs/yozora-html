import type { Image as IImage } from '@yozora/ast'
import sanitize from 'sanitize-html'

/**
 * Render Yozora Markdown AST node `IImage` into HTML string.
 * @param image
 * @returns
 */
export function renderImage(image: IImage): string {
  const url: string = sanitize(image.url, { allowedTags: [] })
  const alt: string = sanitize(image.alt, { allowedTags: [] })
  const title: string = sanitize(image.title || alt, { allowedTags: [] })
  let result: string =
    `<figure class="yozora-image">` +
    `<img alt="${alt}" src="${url}" title="${title}" />`
  if (title.length > 0) {
    result += `<figcaption>${title}</figcaption>`
  }
  result += '</figure>'
  return result
}

export default renderImage
