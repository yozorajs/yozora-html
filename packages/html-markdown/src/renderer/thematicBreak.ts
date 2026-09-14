import type { ThematicBreak } from '@yozora/ast'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `ThematicBreak` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#thematicbreak
 * @see https://www.npmjs.com/package/@yozora/tokenizer-thematic-break
 */
export const renderThematicBreak: INodeRenderer<ThematicBreak> = () => {
  return '<hr class="yozora-thematic-break" />'
}
