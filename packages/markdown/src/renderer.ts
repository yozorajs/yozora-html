import type {
  Definition,
  FootnoteDefinition,
  ImageReference,
  LinkReference,
  YastNode,
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

export type YastNodeRenderer<T extends YastNode> = (
  node: T,
  renderChildren: (nodes: YastNode[]) => string,
) => string

export type YastNodeRendererMap = Record<
  string,
  YastNodeRenderer<YastNode & any>
>

export const defaultRendererMap: YastNodeRendererMap = {
  [AdmonitionType]: renderAdmonition,
  [BlockquoteType]: renderBlockquote,
  [BreakType]: renderBreak,
  [CodeType]: renderCode,
  [DefinitionType]: () => '',
  [DeleteType]: renderDelete,
  [EmphasisType]: renderEmphasis,
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
  definitionMap: Record<string, Definition>,
  footnoteDefinitionMap: Record<string, FootnoteDefinition>,
  _rendererMap: YastNodeRendererMap = defaultRendererMap,
): (nodes: YastNode[]) => string {
  const rendererMap = { ..._rendererMap }

  // render LinkReference
  if (rendererMap[LinkType] != null && rendererMap[LinkReferenceType] == null) {
    const renderLink = rendererMap[LinkType]
    rendererMap[LinkReferenceType] = function (
      linkReference: LinkReference,
    ): string {
      const definition: Omit<Definition, 'type'> =
        definitionMap[linkReference.identifier] ?? ({} as any)
      const { url = '', title } = definition
      return renderLink({ type: LinkType, url, title }, renderChildren)
    }
  }

  // render ImageReference
  if (
    rendererMap[ImageType] != null &&
    rendererMap[ImageReferenceType] == null
  ) {
    const renderImage = _rendererMap[ImageType] ?? defaultRendererMap[ImageType]
    rendererMap[ImageReferenceType] = function (
      imageReference: ImageReference,
    ): string {
      const definition: Omit<Definition, 'type'> =
        definitionMap[imageReference.identifier] ?? ({} as any)
      const { alt } = imageReference
      const { url, title } = definition
      return renderImage({ type: ImageType, alt, url, title }, renderChildren)
    }
  }

  function renderChildren(nodes: YastNode[]): string {
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
