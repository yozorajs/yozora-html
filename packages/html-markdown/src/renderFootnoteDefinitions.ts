import type { FootnoteDefinition } from '@yozora/ast'
import type { INodeRendererContext } from '@yozora/core-html-renderer'
import { renderFootnoteDefinition } from './renderer/footnoteDefinition'

/**
 * Render Yozora Markdown AST node `FootnoteReference` into HTML string.
 */
export function renderFootnoteDefinitions(
  nodes: FootnoteDefinition[],
  context: INodeRendererContext,
): string {
  const title = 'footnote-definitions'
  const children: string = nodes.map(node => renderFootnoteDefinition(node, context)).join('')
  return (
    '<div class="yozora-footnote-definitions">' +
    `<div class="yozora-footnote-definitions__title">${title}</div>` +
    `<ul class="yozora-footnote-definitions__main">${children}</ul>` +
    '</div>'
  )
}
