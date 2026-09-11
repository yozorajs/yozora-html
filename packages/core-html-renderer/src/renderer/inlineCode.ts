import type { InlineCode } from '@yozora/ast'
import { escapeHtml } from '../escapeHtml'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `InlineCode` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#inlinecode
 * @see https://www.npmjs.com/package/@yozora/tokenizer-inline-code
 */
export const renderInlineCode: INodeRenderer<InlineCode> = node => {
  const value: string = escapeHtml(node.value)
  return `<pre class="yozora-inline-code"><code>${value}</code></pre>`
}
