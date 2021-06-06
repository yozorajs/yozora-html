import type { Heading, YastNode } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `Heading` into HTML string.
 * @param heading
 * @param renderChildren
 * @returns
 */
export function renderHeading(
  heading: Heading,
  renderChildren: (nodes: YastNode[]) => string,
): string {
  const { identifier, depth } = heading
  const children: string = renderChildren(heading.children)
  if (identifier != null) {
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
