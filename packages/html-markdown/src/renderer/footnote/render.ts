import type { FootnoteDefinition, FootnoteReference } from '@yozora/ast'
import type { INodeRenderer, INodeRendererContext } from '@yozora/core-html-renderer'
import { escapeAttribute, escapeHtml } from '@yozora/core-html-renderer'
import { definitionId, footnoteContext } from './context'

export const renderFootnoteReference: INodeRenderer<FootnoteReference> = (node, context) => {
  const id = footnoteContext(context).reference(node.identifier)
  const href = `#${encodeURIComponent(definitionId(node.identifier))}`
  return (
    `<sup id="${escapeAttribute(id)}" class="yozora-footnote-reference">` +
    `<a href="${href}" title="${escapeAttribute(node.label)}">[${escapeHtml(node.label)}]</a>` +
    '</sup>'
  )
}

export const renderFootnoteDefinition: INodeRenderer<FootnoteDefinition> = (node, context) => {
  const id = escapeAttribute(definitionId(node.identifier))
  const label = escapeHtml(node.label)
  const children = context.renderChildren(node.children)
  const backlink = footnoteContext(context).backlink(node.identifier)
  return (
    `<div id="${id}" class="yozora-footnote-definition">` +
    '<p class="yozora-footnote-definition__title yozora-paragraph">' +
    backlink +
    `<span>&nbsp;[${label}]:&nbsp;</span>` +
    '</p>' +
    '<div class="yozora-footnote-definition__content">' +
    children +
    '</div></div>'
  )
}

export function renderFootnoteDefinitions(
  nodes: FootnoteDefinition[],
  context: INodeRendererContext,
  renderDefinition: INodeRenderer<FootnoteDefinition> = renderFootnoteDefinition,
): string {
  const children = nodes
    .map(node => {
      const html = renderDefinition(node, context)
      return html === '' ? '' : `<li>${html}</li>`
    })
    .join('')
  return (
    '<div class="yozora-footnote-definitions">' +
    '<div class="yozora-footnote-definitions__title">footnote-definitions</div>' +
    `<ul class="yozora-footnote-definitions__main">${children}</ul>` +
    '</div>'
  )
}
