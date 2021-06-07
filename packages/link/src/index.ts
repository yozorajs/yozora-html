import type { Link, YastNode } from '@yozora/ast'
import sanitize from 'sanitize-html'

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
  const url: string = sanitize(link.url, { allowedTags: [] })
  const title: string = sanitize(link.title || url, { allowedTags: [] })
  const children: string = renderChildren(link.children)
  return `<a class="yozora-link" href="${url}" title="${title}" target="_blank" rel="noopener,noreferrer">${children}</a>`
}

export default renderLink
