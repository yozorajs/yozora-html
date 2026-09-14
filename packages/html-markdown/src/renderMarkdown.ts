import type { Definition, FootnoteDefinition, Root } from '@yozora/ast'
import { FootnoteDefinitionType } from '@yozora/ast'
import { createNodeRendererContext } from './context'
import { escapeAttribute } from './escapeHtml'
import { renderFootnoteDefinitions } from './renderer/footnote'
import { footnoteContext } from './renderer/footnote/context'
import { defaultRendererMap } from './rendererMap'
import type { INodeRendererMap } from './types'

export interface IRenderMarkdownOptions {
  /** Additional classes for the root section; preserves the yozora-markdown class. */
  readonly className?: string
}

export function renderMarkdown(
  ast: Root,
  definitionMap: Record<string, Definition>,
  footnoteDefinitionMap: Record<string, FootnoteDefinition>,
  rendererMap: INodeRendererMap = defaultRendererMap,
  options: IRenderMarkdownOptions = {},
): string {
  const context = createNodeRendererContext(definitionMap, footnoteDefinitionMap, rendererMap)
  const renderChildren = context.renderChildren
  // Definitions are rendered only by the footer, including those nested in other nodes.
  context.renderChildren = nodes =>
    renderChildren((nodes ?? []).filter(node => node.type !== FootnoteDefinitionType))
  const definitions = Object.values(footnoteDefinitionMap)
  footnoteContext(context).prepareDocument(ast.children, definitions)
  const children = context.renderChildren(ast.children)
  const footnotes = renderFootnoteDefinitions(definitions, context, node => renderChildren([node]))
  const className = options.className
    ? `yozora-markdown ${escapeAttribute(options.className)}`
    : 'yozora-markdown'
  return `<section class="${className}"><main>${children}</main><footer>${footnotes}</footer></section>`
}
