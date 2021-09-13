import type { Definition, FootnoteDefinition, Root } from '@yozora/ast'
import type { YastNodeRendererMap } from './renderer'
import { createNodesRenderer, defaultRendererMap } from './renderer'
import './style.css'

export * from './renderer'

/**
 * Render Yozora Markdown AST node `Blockquote` into HTML string.
 * @returns
 */
export function renderMarkdown(
  ast: Root,
  definitionMap: Record<string, Definition>,
  footnoteDefinitionMap: Record<string, FootnoteDefinition>,
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
