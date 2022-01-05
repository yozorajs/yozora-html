import type { IEmphasis, IYastNode } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `IEmphasis` into HTML string.
 * @param emphasis
 * @param renderChildren
 * @returns
 */
export function renderEmphasis(
  emphasis: IEmphasis,
  renderChildren: (nodes: IYastNode[]) => string,
): string {
  const children: string = renderChildren(emphasis.children)
  return `<em class="yozora-emphasis">${children}</em>`
}

export default renderEmphasis
