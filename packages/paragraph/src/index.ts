import type { Node as INode, Paragraph as IParagraph } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `IParagraph` into HTML string.
 * @param paragraph
 * @param renderChildren
 * @returns
 */
export function renderParagraph(
  paragraph: IParagraph,
  renderChildren: (nodes: INode[]) => string,
): string {
  const children: string = renderChildren(paragraph.children)
  return `<p class="yozora-paragraph">${children}</p>`
}

export default renderParagraph
