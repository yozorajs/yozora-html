import type { InlineMath } from '@yozora/ast'
import sanitize from 'sanitize-html'

/**
 * Render Yozora Markdown AST node `InlineMath` into HTML string.
 * @param inlineMath
 * @returns
 */
export function renderInlineMath(inlineMath: InlineMath): string {
  const value: string = sanitize(inlineMath.value, { allowedTags: [] })
  return `<span class="yozora-inline-math">${value}</span>`
}

export default renderInlineMath
