import type {
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
  Emphasis,
  EmphasisType,
  FootnoteDefinition,
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
  Link,
  LinkReference,
  LinkReferenceType,
  LinkType,
  List,
  ListItem,
  ListItemType,
  ListType,
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
   * Sanitize the html to avoid jss attack.
   * @param html
   */
  sanitize(html: string): string
  /**
   * Link / Image reference definitions.
   */
  getDefinition(identifier: string): Readonly<Definition>
  /**
   * Footnote reference definitions.
   */
  getFootnoteDefinition(identifier: string): Readonly<FootnoteDefinition>
}

export type INodeRenderer<T extends Node = Node> = (
  node: T,
  context: INodeRendererContext,
) => string

export interface INodeRendererMap {
  [BlockquoteType]: INodeRenderer<Blockquote>
  [BreakType]: INodeRenderer<Break>
  [CodeType]: INodeRenderer<Code>
  [DefinitionType]: INodeRenderer<Definition>
  [DeleteType]: INodeRenderer<Delete>
  [EmphasisType]: INodeRenderer<Emphasis>
  [HeadingType]: INodeRenderer<Heading>
  [HtmlType]: INodeRenderer<Html>
  [ImageType]: INodeRenderer<Image>
  [ImageReferenceType]: INodeRenderer<ImageReference>
  [InlineCodeType]: INodeRenderer<InlineCode>
  [LinkType]: INodeRenderer<Link>
  [LinkReferenceType]: INodeRenderer<LinkReference>
  [ListType]: INodeRenderer<List>
  [ListItemType]: INodeRenderer<ListItem>
  [ParagraphType]: INodeRenderer<Paragraph>
  [StrongType]: INodeRenderer<Strong>
  [TableType]: INodeRenderer<Table>
  [TextType]: INodeRenderer<Text>
  [ThematicBreakType]: INodeRenderer<ThematicBreak>
  _fallback: INodeRenderer
  [key: string]: INodeRenderer<Node & any>
}
