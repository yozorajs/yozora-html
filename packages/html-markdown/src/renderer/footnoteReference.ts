import type { FootnoteReference } from '@yozora/ast'
import type { INodeRenderer } from '@yozora/core-html-renderer'

/**
 * Render Yozora Markdown AST node `FootnoteReference` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#footnotereference
 * @see https://www.npmjs.com/package/@yozora/tokenizer-footnote-reference
 */
export const renderFootnoteReference: INodeRenderer<FootnoteReference> = (node, context) => {
  const identifier: string = context.sanitize(node.identifier)
  const label: string = context.sanitize(node.label)
  const id: string = encodeURIComponent(identifier)
  return (
    `<sup id="reference-${id}" class="yozora-footnote-reference">` +
    `<a href="#${id}" title="${label}">[${label}]</a>` +
    '</sup>'
  )
}
