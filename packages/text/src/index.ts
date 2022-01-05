import type { IText } from '@yozora/ast'
import sanitize from 'sanitize-html'

/**
 * Render Yozora Markdown AST node `IText` into HTML string.
 * @param text
 * @returns
 */
export function renderText(text: IText): string {
  const value: string = sanitize(text.value, { allowedTags: [] })
  return `<span class="yozora-text">${value}</span>`
}

export default renderText
