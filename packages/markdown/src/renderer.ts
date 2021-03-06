import type {
  Definition as IDefinition,
  FootnoteDefinition as IFootnoteDefinition,
  ImageReference as IImageReference,
  LinkReference as ILinkReference,
  Node as INode,
} from '@yozora/ast'
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
  HeadingType,
  ImageReferenceType,
  ImageType,
  InlineCodeType,
  InlineMathType,
  LinkReferenceType,
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
import renderCode from '@yozora/html-code'
import renderDelete from '@yozora/html-delete'
import renderEmphasis from '@yozora/html-emphasis'
import renderFootnoteReference from '@yozora/html-footnote-reference'
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

export type YastNodeRenderer<T extends INode> = (
  node: T,
  renderChildren: (nodes: INode[]) => string,
) => string

export type YastNodeRendererMap = Record<string, YastNodeRenderer<INode & any>>

export const defaultRendererMap: YastNodeRendererMap = {
  [AdmonitionType]: renderAdmonition,
  [BlockquoteType]: renderBlockquote,
  [BreakType]: renderBreak,
  [CodeType]: renderCode,
  [DefinitionType]: () => '',
  [DeleteType]: renderDelete,
  [EmphasisType]: renderEmphasis,
  [FootnoteReferenceType]: renderFootnoteReference,
  [FootnoteDefinitionType]: () => '',
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
  [EcmaImportType]: () => '',
}

/**
 *
 * @param definitionMap           Link / Image reference definitions.
 * @param footnoteDefinitionMap   Footnote reference definitions.
 * @param _rendererMap
 * @returns
 */
export function createNodesRenderer(
  definitionMap: Record<string, IDefinition>,
  footnoteDefinitionMap: Record<string, IFootnoteDefinition>,
  _rendererMap: YastNodeRendererMap = defaultRendererMap,
): (nodes: INode[]) => string {
  const rendererMap = { ..._rendererMap }

  // render linkReference
  if (rendererMap[LinkType] != null && rendererMap[LinkReferenceType] == null) {
    const renderLink = rendererMap[LinkType]
    rendererMap[LinkReferenceType] = function (
      linkReference: ILinkReference,
    ): string {
      const definition: Omit<IDefinition, 'type'> =
        definitionMap[linkReference.identifier] ?? ({} as any)
      const { url = '', title } = definition
      return renderLink({ type: LinkType, url, title }, renderChildren)
    }
  }

  // render imageReference
  if (
    rendererMap[ImageType] != null &&
    rendererMap[ImageReferenceType] == null
  ) {
    const renderImage = _rendererMap[ImageType] ?? defaultRendererMap[ImageType]
    rendererMap[ImageReferenceType] = function (
      imageReference: IImageReference,
    ): string {
      const definition: Omit<IDefinition, 'type'> =
        definitionMap[imageReference.identifier] ?? ({} as any)
      const { alt } = imageReference
      const { url, title } = definition
      return renderImage({ type: ImageType, alt, url, title }, renderChildren)
    }
  }

  function renderChildren(nodes: INode[]): string {
    if (nodes == null || nodes.length < 1) return ''
    return nodes
      .map(node => {
        const render = rendererMap[node.type]
        if (render == null) {
          console.warn(`Cannot find renderer for node ${node.type}`)
          return ''
        }
        return render(node, renderChildren)
      })
      .join('')
  }

  return renderChildren
}
