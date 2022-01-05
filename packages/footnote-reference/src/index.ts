import type { IFootnoteReference } from '@yozora/ast'
import sanitize from 'sanitize-html'

/**
 * Render Yozora Markdown AST node `IFootnoteReference` into HTML string.
 * @param node
 * @returns
 */
export function renderFootnoteReference(node: IFootnoteReference): string {
  const identifier: string = sanitize(node.identifier, { allowedTags: [] })
  const id: string = encodeURIComponent(identifier)
  const label: string = sanitize(node.label, { allowedTags: [] })
  return (
    `<sup id="reference-${id}" class="yozora-footnote-reference">` +
    `<a href="#${id}" title="${label}">[${label}]</a>` +
    `</sup>`
  )
}

export default renderFootnoteReference
