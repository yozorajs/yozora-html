import type { Text } from '@yozora/ast'
import sanitize from 'sanitize-html'

/**
 * Render Yozora Markdown AST node `Text` into HTML string.
 * @param text
 * @returns
 */
export function renderText(text: Text): string {
  const value: string = sanitize(text.value, { allowedTags: [] })
  return `<span class="yozora-text">${value}</span>`
}

export default renderText
