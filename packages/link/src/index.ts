import type { Link, YastNode } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `Link` into HTML string.
 * @param link
 * @param renderChildren
 * @returns
 */
export function renderLink(
  link: Link,
  renderChildren: (nodes: YastNode[]) => string,
): string {
  const { url, title } = link
  const children: string = renderChildren(link.children)
  return `<a class="yozora-link" href="${url}" title="${title}" target="_blank" rel="noopener,noreferrer">${children}</a>`
}

export default renderLink
