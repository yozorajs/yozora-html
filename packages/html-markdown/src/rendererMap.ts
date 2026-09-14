import {
  AdmonitionType,
  BlockquoteType,
  BreakType,
  CodeType,
  DefinitionType,
  DeleteType,
  EcmaImportType,
  EmphasisType,
  FootnoteDefinitionType,
  FootnoteReferenceType,
  FootnoteType,
  HeadingType,
  HtmlType,
  ImageReferenceType,
  ImageType,
  InlineCodeType,
  InlineMathType,
  LinkReferenceType,
  LinkType,
  ListItemType,
  ListType,
  MathType,
  ParagraphType,
  StrongType,
  TableType,
  TextType,
  ThematicBreakType,
} from '@yozora/ast'
import { renderAdmonition } from './renderer/admonition'
import { renderBlockquote } from './renderer/blockquote'
import { renderBreak } from './renderer/break'
import { renderCode } from './renderer/code'
import { renderDelete } from './renderer/delete'
import { renderEmphasis } from './renderer/emphasis'
import { renderFootnoteDefinition, renderFootnoteReference } from './renderer/footnote/render'
import { renderHeading } from './renderer/heading'
import { renderImage } from './renderer/image'
import { renderImageReference } from './renderer/imageReference'
import { renderInlineCode } from './renderer/inlineCode'
import { renderInlineMath } from './renderer/inlineMath'
import { renderLink } from './renderer/link'
import { renderLinkReference } from './renderer/linkReference'
import { renderList } from './renderer/list'
import { renderListItem } from './renderer/listItem'
import { renderMath } from './renderer/math'
import { renderParagraph } from './renderer/paragraph'
import { renderStrong } from './renderer/strong'
import { renderTable } from './renderer/table'
import { renderText } from './renderer/text'
import { renderThematicBreak } from './renderer/thematicBreak'
import type { INodeRendererMap } from './types'

export const defaultRendererMap: INodeRendererMap = {
  [AdmonitionType]: renderAdmonition,
  [FootnoteType]: () => '',
  [FootnoteReferenceType]: renderFootnoteReference,
  [FootnoteDefinitionType]: renderFootnoteDefinition,
  [InlineMathType]: renderInlineMath,
  [MathType]: renderMath,
  [EcmaImportType]: () => '',
  [BlockquoteType]: renderBlockquote,
  [BreakType]: renderBreak,
  [CodeType]: renderCode,
  [DefinitionType]: () => '',
  [DeleteType]: renderDelete,
  [EmphasisType]: renderEmphasis,
  [HeadingType]: renderHeading,
  [HtmlType]: () => '',
  [ImageType]: renderImage,
  [ImageReferenceType]: renderImageReference,
  [InlineCodeType]: renderInlineCode,
  [LinkType]: renderLink,
  [LinkReferenceType]: renderLinkReference,
  [ListType]: renderList,
  [ListItemType]: renderListItem,
  [ParagraphType]: renderParagraph,
  [StrongType]: renderStrong,
  [TableType]: renderTable,
  [TextType]: renderText,
  [ThematicBreakType]: renderThematicBreak,
  _fallback: node => {
    console.warn(`Cannot find render for \`${node.type}\` type node:`, node)
    return ''
  },
}
