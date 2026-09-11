import type { FootnoteDefinition } from '@yozora/ast'
import type { INodeRenderer } from '@yozora/core-html-renderer'
import { escapeAttribute, escapeHtml } from '@yozora/core-html-renderer'

/**
 * Render Yozora Markdown AST node `Admonition` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#footnotedefinition
 * @see https://www.npmjs.com/package/@yozora/tokenizer-footnote-definition
 */
export const renderFootnoteDefinition: INodeRenderer<FootnoteDefinition> = (node, context) => {
  const identifier: string = escapeAttribute(context.sanitize(node.identifier))
  const label: string = escapeHtml(node.label)
  const children: string = context.renderChildren(node.children)

  /* prettier-ignore */
  return (
    '<div class="yozora-footnote-definition">' +
      '<p class="yozora-footnote-definition__title yozora-paragraph">' +
        `<a href="#reference-${identifier}">&uarr;</a>` +
        `<span>&nbsp;[${label}]:&nbsp;</span>` +
      '</p>' +
      '<div class="yozora-footnote-definition__content">' +
        children +
      '</div>' +
    '</div>'
  )
}
