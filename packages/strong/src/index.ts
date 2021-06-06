import type { Strong, YastNode } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `Strong` into HTML string.
 * @param strong
 * @param renderChildren
 * @returns
 */
export function renderStrong(
  strong: Strong,
  renderChildren: (nodes: YastNode[]) => string,
): string {
  const children = renderChildren(strong.children)
  return `<strong class="yozora-strong">${children}</strong>`
}

export default renderStrong
