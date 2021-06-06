import type { InlineCode } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `InlineCode` into HTML string.
 * @param inlineCode
 * @returns
 */
export function renderInlineCode(inlineCode: InlineCode): string {
  const { value } = inlineCode
  return `<code class="yozora-inline-code">${value}</code>`
}

export default renderInlineCode
