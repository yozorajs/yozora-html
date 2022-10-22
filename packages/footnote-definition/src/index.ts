import type { FootnoteDefinition as IFootnoteDefinition, Node as INode } from '@yozora/ast'
import sanitize from 'sanitize-html'

/**
 * Render Yozora Markdown AST node `IFootnoteDefinition` into HTML string.
 * @param node
 * @param renderChildren
 * @returns
 */
export function renderFootnoteDefinition(
  node: IFootnoteDefinition,
  renderChildren: (nodes: INode[]) => string,
): string {
  const identifier: string = sanitize(node.identifier, { allowedTags: [] })
  const id: string = encodeURIComponent(identifier)
  const label: string = sanitize(node.label, { allowedTags: [] })
  const children: string = renderChildren(node.children)
  return (
    `<li id=${id} class="yozora-footnote-definition">` +
    `<p class="yozora-footnote-definition__title yozora-paragraph">` +
    `<a href=${'#reference-' + id}>&uarr;</a>` +
    `<span>${label}</span>` +
    `</p>` +
    `<div class="yozora-footnote-definition__content">${children}</div>` +
    `</li>`
  )
}

export default renderFootnoteDefinition
