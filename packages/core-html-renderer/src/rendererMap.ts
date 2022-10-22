import type { Definition, FootnoteDefinition, Node } from '@yozora/ast'
import {
  BlockquoteType,
  BreakType,
  CodeType,
  DefinitionType,
  DeleteType,
  EmphasisType,
  HeadingType,
  HtmlType,
  ImageReferenceType,
  ImageType,
  InlineCodeType,
  LinkReferenceType,
  LinkType,
  ListItemType,
  ListType,
  ParagraphType,
  StrongType,
  TableType,
  TextType,
  ThematicBreakType,
} from '@yozora/ast'
import sanitize from 'sanitize-html'
import { renderBlockquote } from './renderer/blockquote'
import { renderBreak } from './renderer/break'
import { renderCode } from './renderer/code'
import { renderDelete } from './renderer/delete'
import { renderEmphasis } from './renderer/emphasis'
import { renderHeading } from './renderer/heading'
import { renderImage } from './renderer/image'
import { renderImageReference } from './renderer/imageReference'
import { renderInlineCode } from './renderer/inlineCode'
import { renderLink } from './renderer/link'
import { renderLinkReference } from './renderer/linkReference'
import { renderList } from './renderer/list'
import { renderListItem } from './renderer/listItem'
import { renderParagraph } from './renderer/paragraph'
import { renderStrong } from './renderer/strong'
import { renderTable } from './renderer/table'
import { renderText } from './renderer/text'
import { renderThematicBreak } from './renderer/thematicBreak'
import type { INodeRendererContext, INodeRendererMap } from './types'

export const defaultRendererMap: INodeRendererMap = {
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

export function createNodeRendererContext(
  definitionMap: Readonly<Record<string, Readonly<Definition>>>,
  footnoteDefinitionMap: Readonly<Record<string, Readonly<FootnoteDefinition>>>,
  rendererMap: INodeRendererMap = defaultRendererMap,
): INodeRendererContext {
  const context: INodeRendererContext = {
    sanitize: value => sanitize(value, { allowedTags: [] }),
    getDefinition: (identifier: string): Readonly<Definition> => definitionMap[identifier],
    getFootnoteDefinition: (identifier: string): Readonly<FootnoteDefinition> =>
      footnoteDefinitionMap[identifier],
    renderChildren: (nodes: Node[]): string => {
      if (nodes == null || nodes.length < 1) return ''
      return nodes
        .map(node => {
          const renderNode = rendererMap[node.type]
          if (renderNode === undefined) {
            console.warn(`Cannot find renderer for node ${node.type}`)
            return ''
          }
          return renderNode(node, context)
        })
        .join('')
    },
  }
  return context
}
