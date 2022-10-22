import type { Definition, FootnoteDefinition, Root } from '@yozora/ast'
import type { INodeRendererMap } from './rendererMap'
import { createNodesRendererContext, defaultRendererMap } from './rendererMap'
import { renderFootnoteDefinitions } from './renderFootnoteDefinitions'

export function renderMarkdown(
  ast: Root,
  definitionMap: Record<string, Definition>,
  footnoteDefinitionMap: Record<string, FootnoteDefinition>,
  rendererMap: INodeRendererMap = defaultRendererMap,
): string {
  const context = createNodesRendererContext(definitionMap, footnoteDefinitionMap, rendererMap)
  const footnotes: string = renderFootnoteDefinitions(Object.values(footnoteDefinitionMap), context)
  const children: string = context.renderChildren(ast.children)

  /* prettier-ignore */
  return (
    `<section class="yozora-markdown">` +
      `<main>${children}</main>` +
      `<footer>${footnotes}</footer>` +
    `</section>`
  )
}
