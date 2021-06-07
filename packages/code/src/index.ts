import type { Code } from '@yozora/ast'
import prism from 'prismjs'
import sanitize from 'sanitize-html'

/**
 * Render Yozora Markdown AST node `Code` into HTML string.
 * @param code
 * @returns
 */
export function renderCode(code: Code): string {
  const { lang, value } = code
  const highlightedCode: string =
    lang != null && prism.languages[lang] != null
      ? prism.highlight(value, prism.languages[lang], lang)
      : sanitize(value, { allowedTags: [] })
  return `<code class="yozora-code"><pre>${highlightedCode}</pre></code>`
}

export default renderCode
