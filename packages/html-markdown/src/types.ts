import type {
  Admonition,
  AdmonitionType,
  Blockquote,
  BlockquoteType,
  Break,
  BreakType,
  Code,
  CodeType,
  Definition,
  DefinitionType,
  Delete,
  DeleteType,
  EcmaImport,
  EcmaImportType,
  Emphasis,
  EmphasisType,
  FootnoteDefinition,
  FootnoteDefinitionType,
  FootnoteReference,
  FootnoteReferenceType,
  Heading,
  HeadingType,
  Html,
  HtmlType,
  Image,
  ImageReference,
  ImageReferenceType,
  ImageType,
  InlineCode,
  InlineCodeType,
  InlineMath,
  InlineMathType,
  Link,
  LinkReference,
  LinkReferenceType,
  LinkType,
  List,
  ListItem,
  ListItemType,
  ListType,
  Math as MathNode,
  MathType,
  Node,
  Paragraph,
  ParagraphType,
  Strong,
  StrongType,
  Table,
  TableType,
  Text,
  TextType,
  ThematicBreak,
  ThematicBreakType,
} from '@yozora/ast'

export type INodeRendererProps<T extends Node> = T

export interface INodeRendererContext {
  /**
   * Render sub-tree.
   * @param nodes
   */
  renderChildren(nodes: Node[]): string
  /**
   * Sanitize an HTML fragment. Use escapeHtml / escapeAttribute for literal values.
   * @param html
   */
  sanitize(html: string): string
  /**
   * Link / Image reference definitions.
   */
  getDefinition(identifier: string): Readonly<Definition> | undefined
  /**
   * Footnote reference definitions.
   */
  getFootnoteDefinition(identifier: string): Readonly<FootnoteDefinition> | undefined
}

export type INodeRenderer<T extends Node = Node> = (
  node: T,
  context: INodeRendererContext,
) => string

export interface INodeRendererMap {
  [AdmonitionType]: INodeRenderer<Admonition>
  [BlockquoteType]: INodeRenderer<Blockquote>
  [BreakType]: INodeRenderer<Break>
  [CodeType]: INodeRenderer<Code>
  [DefinitionType]: INodeRenderer<Definition>
  [DeleteType]: INodeRenderer<Delete>
  [EcmaImportType]: INodeRenderer<EcmaImport>
  [EmphasisType]: INodeRenderer<Emphasis>
  [FootnoteDefinitionType]: INodeRenderer<FootnoteDefinition>
  [FootnoteReferenceType]: INodeRenderer<FootnoteReference>
  [HeadingType]: INodeRenderer<Heading>
  [HtmlType]: INodeRenderer<Html>
  [ImageType]: INodeRenderer<Image>
  [ImageReferenceType]: INodeRenderer<ImageReference>
  [InlineCodeType]: INodeRenderer<InlineCode>
  [InlineMathType]: INodeRenderer<InlineMath>
  [LinkType]: INodeRenderer<Link>
  [LinkReferenceType]: INodeRenderer<LinkReference>
  [ListType]: INodeRenderer<List>
  [ListItemType]: INodeRenderer<ListItem>
  [MathType]: INodeRenderer<MathNode>
  [ParagraphType]: INodeRenderer<Paragraph>
  [StrongType]: INodeRenderer<Strong>
  [TableType]: INodeRenderer<Table>
  [TextType]: INodeRenderer<Text>
  [ThematicBreakType]: INodeRenderer<ThematicBreak>
  _fallback: INodeRenderer
  [key: string]: INodeRenderer<Node & any>
}
