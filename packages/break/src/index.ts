import type { IBreak } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `IBreak` into HTML string.
 * @param node
 * @returns
 */
export function renderBreak(node: IBreak): string {
  return `<br class="yozora-break" />`
}

export default renderBreak
