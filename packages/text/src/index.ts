import type { Text } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `Text` into HTML string.
 * @param text
 * @returns
 */
export function renderText(text: Text): string {
  const { value } = text
  return `<span class="yozora-text">${value}</span>`
}

export default renderText
