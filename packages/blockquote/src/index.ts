import type { Blockquote as IBlockquote, Node as INode } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `IBlockquote` into HTML string.
 * @param blockquote
 * @param renderChildren
 * @returns
 */
export function renderBlockquote(
  blockquote: IBlockquote,
  renderChildren: (nodes: INode[]) => string,
): string {
  const children: string = renderChildren(blockquote.children)
  return `<blockquote class="yozora-blockquote">${children}</blockquote>`
}

export default renderBlockquote
