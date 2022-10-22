import type { Code } from '@yozora/ast'
import prism from 'prismjs'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `Code` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-code
 */
export const renderCode: INodeRenderer<Code> = (node, context) => {
  const { value, lang } = node
  const highlightedCode: string =
    lang != null && prism.languages[lang] != null
      ? prism.highlight(value, prism.languages[lang], lang)
      : context.sanitize(value)
  return `<pre class="yozora-code"><code>${highlightedCode}</code></pre>`
}
