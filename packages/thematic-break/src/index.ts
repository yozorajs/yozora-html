import type { IThematicBreak } from '@yozora/ast'

/**
 * Render Yozora Markdown AST node `IThematicBreak` into HTML string.
 * @param thematicBreak
 * @returns
 */
export function renderThematicBreak(_thematicBreak: IThematicBreak): string {
  return `<hr class="yozora-thematic-break" />`
}

export default renderThematicBreak
