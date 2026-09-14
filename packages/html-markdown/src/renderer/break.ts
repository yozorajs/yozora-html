import type { Break } from '@yozora/ast'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `Break` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#break
 * @see https://www.npmjs.com/package/@yozora/tokenizer-break
 */
export const renderBreak: INodeRenderer<Break> = () => {
  return '<br class="yozora-break" />'
}
