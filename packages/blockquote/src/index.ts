import type { Blockquote, YastNode } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `Blockquote` into HTML string.
 * @param blockquote
 * @param renderChildren
 * @returns
 */
export function renderBlockquote(
  blockquote: Blockquote,
  renderChildren: (nodes: YastNode[]) => string,
): string {
  const children = renderChildren(blockquote.children)
  return `<blockquote class="yozora-blockquote">${children}</blockquote>`
}

export default renderBlockquote
