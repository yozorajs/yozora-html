import type { YastNode } from '@yozora/ast'
import {
  AdmonitionType,
  BlockquoteType,
  BreakType,
  DeleteType,
  EmphasisType,
  HeadingType,
  ImageType,
  InlineCodeType,
  InlineMathType,
  LinkType,
  ListType,
  MathType,
  ParagraphType,
  StrongType,
  TableType,
  TextType,
  ThematicBreakType,
} from '@yozora/ast'
import renderAdmonition from '@yozora/html-admonition'
import renderBlockquote from '@yozora/html-blockquote'
import renderBreak from '@yozora/html-break'
import renderDelete from '@yozora/html-delete'
import renderEmphasis from '@yozora/html-emphasis'
import renderHeading from '@yozora/html-heading'
import renderImage from '@yozora/html-image'
import renderInlineCode from '@yozora/html-inline-code'
import renderInlineMath from '@yozora/html-inline-math'
import renderLink from '@yozora/html-link'
import renderList from '@yozora/html-list'
import renderMath from '@yozora/html-math'
import renderParagraph from '@yozora/html-paragraph'
import renderStrong from '@yozora/html-strong'
import renderTable from '@yozora/html-table'
import renderText from '@yozora/html-text'
import renderThematicBreak from '@yozora/html-thematic-break'

type YastNodeRenderer<T extends YastNode> = (
  node: T,
  renderChildren: (nodes: YastNode[]) => string,
) => string

const renderMap: Record<string, YastNodeRenderer<YastNode & any>> = {
  [AdmonitionType]: renderAdmonition,
  [BlockquoteType]: renderBlockquote,
  [BreakType]: renderBreak,
  [DeleteType]: renderDelete,
  [EmphasisType]: renderEmphasis,
  [HeadingType]: renderHeading,
  [ImageType]: renderImage,
  [InlineCodeType]: renderInlineCode,
  [InlineMathType]: renderInlineMath,
  [MathType]: renderMath,
  [LinkType]: renderLink,
  [ListType]: renderList,
  [ParagraphType]: renderParagraph,
  [StrongType]: renderStrong,
  [TableType]: renderTable,
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
