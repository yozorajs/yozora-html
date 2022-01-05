import type { IInlineCode } from '@yozora/ast'
import sanitize from 'sanitize-html'

/**
 * Render Yozora Markdown AST node `IInlineCode` into HTML string.
 * @param inlineCode
 * @returns
 */
export function renderInlineCode(inlineCode: IInlineCode): string {
  const value: string = sanitize(inlineCode.value, { allowedTags: [] })
  return `<code class="yozora-inline-code">${value}</code>`
}

export default renderInlineCode
