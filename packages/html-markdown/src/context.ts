import type { Definition, FootnoteDefinition, Node } from '@yozora/ast'
import sanitize from 'sanitize-html'
import { defaultRendererMap } from './rendererMap'
import type { INodeRendererContext, INodeRendererMap } from './types'

export function createNodeRendererContext(
  definitionMap: Readonly<Record<string, Readonly<Definition>>>,
  footnoteDefinitionMap: Readonly<Record<string, Readonly<FootnoteDefinition>>>,
  rendererMap: INodeRendererMap = defaultRendererMap,
): INodeRendererContext {
  const context: INodeRendererContext = {
    sanitize: value => sanitize(value, { allowedTags: [] }),
    getDefinition: (identifier: string): Readonly<Definition> | undefined =>
      Object.hasOwn(definitionMap, identifier) ? definitionMap[identifier] : undefined,
    getFootnoteDefinition: (identifier: string): Readonly<FootnoteDefinition> | undefined =>
      Object.hasOwn(footnoteDefinitionMap, identifier)
        ? footnoteDefinitionMap[identifier]
        : undefined,
    renderChildren: (nodes: Node[]): string => {
      if (nodes == null || nodes.length < 1) return ''
      return nodes
        .map(node => {
          const renderNode =
            Object.hasOwn(rendererMap, node.type) && typeof rendererMap[node.type] === 'function'
              ? rendererMap[node.type]
              : rendererMap._fallback
          return renderNode(node, context)
        })
        .join('')
    },
  }
  return context
}
