import type { YastNode } from '@yozora/ast'
import {
  BlockquoteType,
  BreakType,
  DeleteType,
  EmphasisType,
  InlineCodeType,
  ParagraphType,
  StrongType,
  TextType,
  ThematicBreakType,
} from '@yozora/ast'
import renderBlockquote from '@yozora/html-blockquote'
import renderBreak from '@yozora/html-break'
import renderDelete from '@yozora/html-delete'
import renderEmphasis from '@yozora/html-emphasis'
import renderInlineCode from '@yozora/html-inline-code'
import renderParagraph from '@yozora/html-paragraph'
import renderStrong from '@yozora/html-strong'
import renderText from '@yozora/html-text'
import renderThematicBreak from '@yozora/html-thematic-break'

type YastNodeRenderer<T extends YastNode> = (
  node: T,
  renderChildren: (nodes: YastNode[]) => string,
) => string

const renderMap: Record<string, YastNodeRenderer<YastNode & any>> = {
  [BlockquoteType]: renderBlockquote,
  [BreakType]: renderBreak,
  [DeleteType]: renderDelete,
  [EmphasisType]: renderEmphasis,
  [InlineCodeType]: renderInlineCode,
  [ParagraphType]: renderParagraph,
  [StrongType]: renderStrong,
  [TextType]: renderText,
  [ThematicBreakType]: renderThematicBreak,
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
