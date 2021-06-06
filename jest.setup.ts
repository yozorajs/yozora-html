import type { YastNode } from '@yozora/ast';
import { BlockquoteType , BreakType, DeleteType, EmphasisType ,
  HeadingType,
  ImageType,
  InlineCodeType,
  LinkType,
  ListType,
  ParagraphType,
  StrongType,
  TextType,
  ThematicBreakType,
} from '@yozora/ast';
import renderBlockquote from '@yozora/html-blockquote'
import renderBreak from '@yozora/html-break'
import renderDelete from '@yozora/html-delete'
import renderEmphasis from '@yozora/html-emphasis'
import renderHeading from '@yozora/html-heading'
import renderImage from '@yozora/html-image'
import renderInlineCode from '@yozora/html-inline-code'
import renderLink from '@yozora/html-inline-code'
import renderList from '@yozora/html-list'
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
  [HeadingType]: renderHeading,
  [ImageType]: renderImage,
  [InlineCodeType]: renderInlineCode,
  [LinkType]: renderLink,
  [ListType]: renderList,
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
