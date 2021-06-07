import type { Math } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `Math` into HTML string.
 * @param math
 * @returns
 */
export function renderMath(math: Math): string {
  const { value } = math
  return `<div class="yozora-math">${value}</div>`
}

export default renderMath
