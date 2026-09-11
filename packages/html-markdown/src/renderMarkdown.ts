import type { Definition, FootnoteDefinition, Root } from '@yozora/ast'
import { FootnoteDefinitionType } from '@yozora/ast'
import { footnoteContext } from './renderer/footnote/context'
import { renderFootnoteDefinitions } from './renderer/footnote/render'
import type { INodeRendererMap } from './rendererMap'
import { createNodesRendererContext, defaultRendererMap } from './rendererMap'

export function renderMarkdown(
  ast: Root,
  definitionMap: Record<string, Definition>,
  footnoteDefinitionMap: Record<string, FootnoteDefinition>,
  rendererMap: INodeRendererMap = defaultRendererMap,
): string {
  const context = createNodesRendererContext(definitionMap, footnoteDefinitionMap, rendererMap)
  const renderChildren = context.renderChildren
  // Definitions are rendered only by the footer, including those nested in other nodes.
  context.renderChildren = nodes =>
    renderChildren((nodes ?? []).filter(node => node.type !== FootnoteDefinitionType))
  const definitions = Object.values(footnoteDefinitionMap)
  footnoteContext(context).prepareDocument(ast.children, definitions)
  const children = context.renderChildren(ast.children)
  const footnotes = renderFootnoteDefinitions(definitions, context, node => renderChildren([node]))
  return `<section class="yozora-markdown"><main>${children}</main><footer>${footnotes}</footer></section>`
}
