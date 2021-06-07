import type { InlineMath } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `InlineMath` into HTML string.
 * @param inlineMath
 * @returns
 */
export function renderInlineMath(inlineMath: InlineMath): string {
  const { value } = inlineMath
  return `<span class="yozora-inline-math">${value}</span>`
}

export default renderInlineMath
