import type { Code } from '@yozora/ast'
import prism from 'prismjs'
import 'prismjs/components/prism-typescript.js'
import sanitize from 'sanitize-html'
import { escapeAttribute, escapeHtml } from '../escapeHtml'
import type { INodeRenderer } from '../types'

/**
 * Render Yozora Markdown AST node `Code` into HTML string.
 * @see https://www.npmjs.com/package/@yozora/ast#code
 * @see https://www.npmjs.com/package/@yozora/tokenizer-code
 */
export const renderCode: INodeRenderer<Code> = node => {
  const { value, lang } = node
  const language = lang ?? ''
  const label = language || 'text'
  const grammar = Object.hasOwn(prism.languages, language) ? prism.languages[language] : undefined
  const highlightedCode: string =
    grammar != null && typeof grammar === 'object'
      ? sanitize(prism.highlight(value, grammar, language), {
          // Prism hooks can change markup after token contents have been escaped.
          allowedTags: ['span'],
          allowedAttributes: { span: ['class'] },
        })
      : escapeHtml(value)
  const lineNumbers = Array.from(
    { length: value.split(/\r\n|\r|\n/).length },
    (_, index) => `<span>${index + 1}</span>`,
  ).join('')

  return (
    '<div class="yozora-code">' +
    '<div class="yozora-code__toolbar">' +
    '<span class="yozora-code__lights" aria-hidden="true"><span></span><span></span><span></span></span>' +
    `<span class="yozora-code__language">${escapeHtml(label)}</span>` +
    '</div>' +
    '<div class="yozora-code__body">' +
    `<div class="yozora-code__line-numbers" aria-hidden="true">${lineNumbers}</div>` +
    `<pre class="yozora-code__pre" tabindex="0" role="region" aria-label="${escapeAttribute(label)} code block">` +
    `<code class="yozora-code__content">${highlightedCode}</code>` +
    '</pre></div></div>'
  )
}
