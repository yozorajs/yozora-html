import type { Break } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `Break` into HTML string.
 * @param node
 * @returns
 */
export function renderBreak(node: Break): string {
  return `<br class="yozora-break" />`
}

export default renderBreak
