import type { InlineMath as IInlineMath } from '@yozora/ast'
import sanitize from 'sanitize-html'

/**
 * Render Yozora Markdown AST node `IInlineMath` into HTML string.
 * @param inlineMath
 * @returns
 */
export function renderInlineMath(inlineMath: IInlineMath): string {
  const value: string = sanitize(inlineMath.value, { allowedTags: [] })
  return `<span class="yozora-inline-math">${value}</span>`
}

export default renderInlineMath
