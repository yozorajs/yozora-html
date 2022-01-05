import type { IStrong, IYastNode } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `IStrong` into HTML string.
 * @param strong
 * @param renderChildren
 * @returns
 */
export function renderStrong(
  strong: IStrong,
  renderChildren: (nodes: IYastNode[]) => string,
): string {
  const children: string = renderChildren(strong.children)
  return `<strong class="yozora-strong">${children}</strong>`
}

export default renderStrong
