import type { Paragraph, YastNode } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `Paragraph` into HTML string.
 * @param paragraph
 * @returns
 */
export function renderParagraph(
  paragraph: Paragraph,
  renderChildren: (nodes: YastNode[]) => string,
): string {
  const children = renderChildren(paragraph.children)
  return `<p class="yozora-paragraph">${children}</p>`
}

export default renderParagraph
