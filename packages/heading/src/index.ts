import type { Heading as IHeading, Node as INode } from '@yozora/ast'
import sanitize from 'sanitize-html'

/**
 * Render Yozora Markdown AST node `IHeading` into HTML string.
 * @param node
 * @param renderChildren
 * @returns
 */
export function renderHeading(
  node: IHeading,
  renderChildren: (nodes: INode[]) => string,
): string {
  const depth = Number(node.depth)
  const children: string = renderChildren(node.children)
  if (node.identifier != null) {
    const identifier: string = sanitize(node.identifier, { allowedTags: [] })
    const id = encodeURIComponent(identifier)
    return (
      `<h${depth} id="${id}" className="yozora-heading yozora-heading--toc">` +
      `<p className="yozora-heading__content">${children}</p>` +
      `<a className="yozora-heading__anchor" href="#${id}">¶</a>` +
      `</h${depth}>`
    )
  }

  return (
    `<h${depth} className="yozora-heading">` +
    `<p className="yozora-heading__content">${children}</p>` +
    `</h${depth}>`
  )
}

export default renderHeading
