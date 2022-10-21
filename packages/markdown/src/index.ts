import type {
  Definition as IDefinition,
  FootnoteDefinition as IFootnoteDefinition,
  Root as IRoot,
} from '@yozora/ast'
import type { YastNodeRendererMap } from './renderer'
import { createNodesRenderer, defaultRendererMap } from './renderer'
import renderFootnoteDefinitions from './renderFootnoteDefinitions'

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

  const footnotes: string = renderFootnoteDefinitions(
    Object.values(footnoteDefinitionMap),
    renderChildren,
  )
  const children: string = renderChildren(ast.children)
  return (
    `<div class="yozora-markdown">` +
    `<section>${children}</section>` +
    `<footer>${footnotes}</footer>` +
    `</div>`
  )
}

export default renderMarkdown
