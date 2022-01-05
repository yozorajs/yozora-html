import type { IDefinition, IFootnoteDefinition, IRoot } from '@yozora/ast'
import type { YastNodeRendererMap } from './renderer'
import { createNodesRenderer, defaultRendererMap } from './renderer'
import './style.css'

export * from './renderer'

/**
 * Render Yozora Markdown AST node `IBlockquote` into HTML string.
 * @returns
 */
export function renderMarkdown(
  ast: IRoot,
  definitionMap: Record<string, IDefinition>,
  footnoteDefinitionMap: Record<string, IFootnoteDefinition>,
  renderMap: YastNodeRendererMap = defaultRendererMap,
): string {
  const renderChildren = createNodesRenderer(
    definitionMap,
    footnoteDefinitionMap,
    renderMap,
  )

  const children: string = renderChildren(ast.children)
  return `<div class="yozora-markdown">${children}</div>`
}

export default renderMarkdown
