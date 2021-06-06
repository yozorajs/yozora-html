import type { Emphasis, YastNode } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `Emphasis` into HTML string.
 * @param emphasis
 * @param renderChildren
 * @returns
 */
export function renderEmphasis(
  emphasis: Emphasis,
  renderChildren: (nodes: YastNode[]) => string,
): string {
  const children: string = renderChildren(emphasis.children)
  return `<em class="yozora-emphasis">${children}</em>`
}

export default renderEmphasis
