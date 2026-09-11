<header>
  <h1 align="center">
    <a href="https://github.com/yozorajs/yozora-html/tree/main/packages/html-markdown#readme">@yozora/html-markdown</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/html-markdown">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/html-markdown.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-markdown">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/html-markdown.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-markdown">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/html-markdown.svg"
      />
    </a>
    <a href="#install">
      <img
        alt="Module formats: cjs, esm"
        src="https://img.shields.io/badge/module_formats-cjs%2C%20esm-green.svg"
      />
    </a>
    <a href="https://github.com/nodejs/node">
      <img
        alt="Node.js Version"
        src="https://img.shields.io/node/v/@yozora/html-markdown"
      />
    </a>
    <a href="https://vitest.dev">
      <img
        alt="Tested with Vitest"
        src="https://img.shields.io/badge/tested_with-Vitest-6E9F18?logo=vitest"
      />
    </a>
    <a href="https://github.com/prettier/prettier">
      <img
        alt="Code Style: prettier"
        src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"
      />
    </a>
  </div>
</header>
<br/>

This component is for rendering the Yozora Markdown AST node [`Root`][@yozora/ast] 
produced by [@yozora/parser][] into HTML string.

## Install

* npm

  ```bash
  npm install --save @yozora/html-markdown
  ```

* pnpm

  ```bash
  pnpm add @yozora/html-markdown
  ```


## Usage

* Basic:

  ```typescript
  import type { Root } from '@yozora/ast'
  import { renderMarkdown, defaultRendererMap } from '@yozora/html-markdown'
  import '@yozora/html-markdown/lib/index.css'  // load preset styles.

  const root = {
    "type": "root",
    "children": [
      {
        "type": "markdown",
        "children": [
          {
            "type": "text",
            "value": "yozora is cool!"
          }
        ]
      }
    ]
  }
  renderMarkdown(
    markdown as Root,
    {}, // definitionMap
    {}, // footnoteDefinitionMap
    defaultRendererMap 
  )
  // => <markdown class="yozora-markdown"><span class="yozora-text">yozora is cool!</span></markdown>
  ```

## Footnotes

Pass definitions indexed by their raw AST identifiers in `footnoteDefinitionMap`, including
definitions nested in other nodes. `renderMarkdown` treats this map as the footer's source;
definition nodes in the document or in definition children are skipped during normal child
rendering. This renders each mapped definition once without changing the input AST.

Default definitions have `footnote-<encoded identifier>` IDs. References use
`reference-<encoded identifier>-<occurrence>` IDs, with occurrences starting at 1 for each
document. Fragment URLs encode those complete IDs, so spaces, Unicode and literal percent
signs resolve consistently. Repeated references link to the same definition, and the default
backlink points to the first rendered reference when one exists.

The footer wraps each definition renderer's non-empty output in an `li` within its `ul`.
Returning an empty string omits the list item.
The footer honors `rendererMap.footnoteDefinition`, and its children use the same custom
renderers as the document body. Custom reference or definition renderers own their markup
and anchor conventions; delegate to `defaultRendererMap` to retain the default output.

Footnote state is associated with the renderer context, so delegated default renderers share
reference numbering. Before rendering, `renderMarkdown` scans standard AST children and
admonition titles in the document and mapped definitions to determine which backlinks exist.
Default renderers return complete HTML immediately, so wrappers may remove comments or
post-process that HTML. The scan does not execute custom renderers; each renderer is called
only during the normal rendering pass.

Precomputed backlinks assume standard AST traversal. If a custom renderer hides AST references,
introduces references absent from the AST, or changes which child fields are rendered, it must
also manage the affected reference/definition links, or receive an AST normalized to reflect
its output. Pure wrappers delegating to the default renderers need no special handling.

Implementation is grouped under `src/renderer/footnote/`: `context.ts` owns IDs, per-context reference
state and reference precomputation; `render.ts` renders references, definitions and the footer.
The corresponding tests live under `__test__/footnotes/`.

## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/tokenizer-markdown][]
* [markdown | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#root
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-markdown]: https://www.npmjs.com/package/@yozora/tokenizer-markdown
[mdast]: https://github.com/syntax-tree/mdast#markdown
