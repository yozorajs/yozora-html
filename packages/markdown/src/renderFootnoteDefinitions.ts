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
  const title = 'footnote-definitions'
  const children: string = nodes
    .map(node => renderFootnoteDefinition(node, renderChildren))
    .join('')
  return (
    `<div class="yozora-footnote-definitions">` +
    `<div class="yozora-footnote-definitions__title">${title}</div>` +
    `<ul class="yozora-footnote-definitions__main">${children}</ul>` +
    `</div>`
  )
}

export default renderFootnoteDefinitions
