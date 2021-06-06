import type { Image } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `Image` into HTML string.
 * @param image
 * @returns
 */
export function renderImage(image: Image): string {
  const { alt, url, title } = image
  return `<img class="yozora-image" alt="${alt} src="${url}" title="${title}"`
}

export default renderImage
