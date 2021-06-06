import type { YastNode } from '@yozora/ast'
import { StrongType, TextType, ThematicBreakType } from '@yozora/ast'
import renderStrong from '@yozora/html-strong'
import renderText from '@yozora/html-text'
import renderThematicBreak from '@yozora/html-thematic-break'

type YastNodeRenderer<T extends YastNode> = (
  node: T,
  renderChildren: (nodes: YastNode[]) => string,
) => string

const renderMap: Record<string, YastNodeRenderer<YastNode & any>> = {
  [TextType]: renderText,
  [ThematicBreakType]: renderThematicBreak,
  [StrongType]: renderStrong,
}

export function renderChildren(nodes: YastNode[]): string {
  return nodes
    .map(node => {
      const render = renderMap[node.type]
      if (render == null) return ''
      return render(node, renderChildren)
    })
    .join('')
}
