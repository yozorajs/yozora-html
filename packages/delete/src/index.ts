import type { Delete, YastNode } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `Delete` into HTML string.
 * @param node
 * @param renderChildren
 * @returns
 */
export function renderDelete(
  node: Delete,
  renderChildren: (nodes: YastNode[]) => string,
): string {
  const children: string = renderChildren(node.children)
  return `<del class="yozora-delete">${children}</del>`
}

export default renderDelete
