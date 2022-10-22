import type { FootnoteDefinition } from '@yozora/ast'
import type { INodeRenderer } from '@yozora/core-html-renderer'

/**
 * Render Yozora Markdown AST node `Admonition` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#footnotedefinition
 * @see https://www.npmjs.com/package/@yozora/tokenizer-footnote-definition
 */
export const renderFootnoteDefinition: INodeRenderer<FootnoteDefinition> = (node, context) => {
  const identifier: string = context.sanitize(node.identifier)
  const label: string = context.sanitize(node.label)
  const children: string = context.renderChildren(node.children)

  /* prettier-ignore */
  return (
    `<div className="yozora-footnote-definition">` +
      `<p className="yozora-footnote-definition__title yozora-paragraph">` +
        `<a href="#reference-${identifier}">&uarr;</a>` +
        `<span>&nbsp;[${label}]:&nbsp;</span>` +
      `</p>` +
      `<div className="yozora-footnote-definition__content">` +
        children +
      `</div>` +
    `</div>`
  )
}
