import type {
  FootnoteDefinition as IFootnoteDefinition,
  Node as INode,
} from '@yozora/ast'
import { renderFootnoteDefinition } from '@yozora/html-footnote-definition'

/**
 * Render Yozora Markdown AST node `IFootnoteReference` into HTML string.
 * @param props
 * @returns
 */
export function renderFootnoteDefinitions(
  nodes: IFootnoteDefinition[],
  renderChildren: (nodes: INode[]) => string,
): string {
  const title = 'footnote-definition'
  const children: string = nodes
    .map(node => renderFootnoteDefinition(node, renderChildren))
    .join('')
  return (
    `<div class="yozora-footnote-definition">` +
    `<div class="yozora-footnote-definition__title">${title}</div>` +
    `<ul class="yozora-footnote-definition__main">${children}</ul>` +
    `</div>`
  )
}

export default renderFootnoteDefinitions
