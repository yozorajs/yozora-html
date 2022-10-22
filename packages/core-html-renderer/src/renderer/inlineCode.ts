import type { InlineCode } from '@yozora/ast'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `InlineCode` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#inlinecode
 * @see https://www.npmjs.com/package/@yozora/tokenizer-inline-code
 */
export const renderInlineCode: INodeRenderer<InlineCode> = (node, context) => {
  const value: string = context.sanitize(node.value)
  return `<pre class="yozora-inline-code"><code>${value}</code></pre>`
}
