import type { Admonition, YastNode } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `Admonition` into HTML string.
 * @param admonition
 * @param renderChildren
 * @returns
 */
export function renderAdmonition(
  admonition: Admonition,
  renderChildren: (nodes: YastNode[]) => string,
): string {
  const { keyword } = admonition

  let modifier = keyword.trim().toLowerCase()
  switch (modifier) {
    case 'note':
      modifier = 'default'
      break
    case 'important':
      modifier = 'info'
      break
    case 'tip':
      modifier = 'success'
      break
    case 'caution':
      modifier = 'warning'
      break
    case 'error':
      modifier = 'danger'
      break
  }

  const title: string = renderChildren(admonition.title)
  const children: string = renderChildren(admonition.children)

  return (
    `<div class="yozora-admonition yozora-admonition--${modifier}">` +
    `<div class="yozora-admonition__heading"><h5>${title}</h5></div>` +
    `<div class="yozora-admonition__body">${children}</div>` +
    '</div>'
  )
}

export default renderAdmonition
