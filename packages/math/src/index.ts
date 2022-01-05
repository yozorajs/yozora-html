import type { IMath } from '@yozora/ast'
import sanitize from 'sanitize-html'

/**
 * Render Yozora Markdown AST node `IMath` into HTML string.
 * @param math
 * @returns
 */
export function renderMath(math: IMath): string {
  const value: string = sanitize(math.value, { allowedTags: [] })
  return `<div class="yozora-math">${value}</div>`
}

export default renderMath
