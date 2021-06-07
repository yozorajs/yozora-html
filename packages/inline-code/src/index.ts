import type { InlineCode } from '@yozora/ast'
import sanitize from 'sanitize-html'

/**
 * Render Yozora Markdown AST node `InlineCode` into HTML string.
 * @param inlineCode
 * @returns
 */
export function renderInlineCode(inlineCode: InlineCode): string {
  const value: string = sanitize(inlineCode.value, { allowedTags: [] })
  return `<code class="yozora-inline-code">${value}</code>`
}

export default renderInlineCode
