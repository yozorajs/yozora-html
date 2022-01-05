import type { ILink, IYastNode } from '@yozora/ast'
import sanitize from 'sanitize-html'

/**
 * Render Yozora Markdown AST node `ILink` into HTML string.
 * @param link
 * @param renderChildren
 * @returns
 */
export function renderLink(
  link: ILink,
  renderChildren: (nodes: IYastNode[]) => string,
): string {
  const url: string = sanitize(link.url, { allowedTags: [] })
  const title: string = sanitize(link.title || url, { allowedTags: [] })
  const children: string = renderChildren(link.children)
  return `<a class="yozora-link" href="${url}" title="${title}" target="_blank" rel="noopener,noreferrer">${children}</a>`
}

export default renderLink
