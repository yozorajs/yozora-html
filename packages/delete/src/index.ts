import type { Delete as IDelete, Node as INode } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `IDelete` into HTML string.
 * @param node
 * @param renderChildren
 * @returns
 */
export function renderDelete(
  node: IDelete,
  renderChildren: (nodes: INode[]) => string,
): string {
  const children: string = renderChildren(node.children)
  return `<del class="yozora-delete">${children}</del>`
}

export default renderDelete
