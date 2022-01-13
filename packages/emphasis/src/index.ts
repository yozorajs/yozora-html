import type { Emphasis as IEmphasis, Node as INode } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `IEmphasis` into HTML string.
 * @param emphasis
 * @param renderChildren
 * @returns
 */
export function renderEmphasis(
  emphasis: IEmphasis,
  renderChildren: (nodes: INode[]) => string,
): string {
  const children: string = renderChildren(emphasis.children)
  return `<em class="yozora-emphasis">${children}</em>`
}

export default renderEmphasis
