import type { Admonition } from '@yozora/ast'
import type { INodeRendererContext } from '../../types'
import {
  YozoraAdmonitionCautionIcon,
  YozoraAdmonitionDangerIcon,
  YozoraAdmonitionInfoIcon,
  YozoraAdmonitionNoteIcon,
  YozoraAdmonitionTipIcon,
} from './icons'

// Render Yozora Markdown AST node `Admonition` into HTML string.
export function renderAdmonition(
  admonition: Admonition,
  context: Pick<INodeRendererContext, 'sanitize' | 'renderChildren'>,
): string {
  const keyword: string = context.sanitize(admonition.keyword)
  let modifier: string = keyword.trim().toLowerCase()
  let defaultTitle = ''
  let icon = ''
  switch (modifier) {
    case 'default':
    case 'note':
      modifier = 'note'
      defaultTitle = 'NOTE'
      icon = YozoraAdmonitionNoteIcon
      break
    case 'important':
    case 'info':
      modifier = 'info'
      defaultTitle = 'INFO'
      icon = YozoraAdmonitionInfoIcon
      break
    case 'success':
    case 'tip':
      modifier = 'success'
      defaultTitle = 'SUCCESS'
      icon = YozoraAdmonitionTipIcon
      break
    case 'warning':
    case 'caution':
      modifier = 'warning'
      defaultTitle = 'CAUTION'
      icon = YozoraAdmonitionCautionIcon
      break
    case 'error':
    case 'danger':
      modifier = 'danger'
      defaultTitle = 'DANGER'
      icon = YozoraAdmonitionDangerIcon
      break
    default:
      if (!/^[\w-]+$/.test(modifier)) {
        modifier = ''
      }
  }

  const title: string =
    admonition.title.length > 0 ? context.renderChildren(admonition.title) : defaultTitle
  const children: string = context.renderChildren(admonition.children)

  return (
    `<div class="yozora-admonition yozora-admonition--${modifier}">` +
    '<h5 class="yozora-admonition__heading">' +
    `<span class="yozora-admonition__heading-icon">${icon}</span>` +
    `<span class="yozora-admonition__heading-title">${title}</span>` +
    '</h5>' +
    `<div class="yozora-admonition__body">${children}</div>` +
    '</div>'
  )
}
