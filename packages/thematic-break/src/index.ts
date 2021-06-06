import type { ThematicBreak } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `ThematicBreak` into HTML string.
 * @param thematicBreak
 * @returns
 */
export function renderThematicBreak(thematicBreak: ThematicBreak): string {
  return `<hr class="yozora-thematic-break" />`
}

export default renderThematicBreak
