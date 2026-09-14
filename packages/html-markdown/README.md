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
    <a href="https://biomejs.dev/">
      <img
        alt="Code Style: Biome"
        src="https://img.shields.io/badge/code_style-Biome-60a5fa.svg?style=flat-square"
      />
    </a>
  </div>
</header>
<br/>

Render a [Yozora AST](https://www.npmjs.com/package/@yozora/ast#root) into an HTML string.
Includes tables, task lists, admonitions, footnotes and syntax highlighting.
Math is rendered as plain text; no LaTeX engine is included.

## Install

```sh
pnpm add @yozora/html-markdown
```

ESM, CommonJS and TypeScript declarations are included.

## Usage

```typescript
import type { Root } from '@yozora/ast'
import { renderMarkdown } from '@yozora/html-markdown'
import '@yozora/html-markdown/style.css'

const paragraph = {
  type: 'paragraph',
  children: [{ type: 'text', value: 'Hello, Yozora!' }],
}
const root: Root = { type: 'root', children: [paragraph] }
const html = renderMarkdown(root, {}, {})
```

`renderMarkdown(root, definitionMap, footnoteDefinitionMap, rendererMap?, options?)` returns
`section.yozora-markdown` with a `main` body and `footer`. Supply link/image and footnote
definitions keyed by their raw AST identifiers; use empty maps when there are none.
`options.className` adds escaped classes to the section.

### Custom renderers

Override entries by spreading `defaultRendererMap` into the fourth argument. The map covers
standard and extended Markdown nodes. Node renderers, escaping helpers and renderer types
are also exported.

For individual nodes, use `createNodeRendererContext(definitionMap, footnoteDefinitionMap, rendererMap?)`:

```typescript
import type { Text } from '@yozora/ast'
import { createNodeRendererContext } from '@yozora/html-markdown'

const context = createNodeRendererContext({}, {})
const node: Text = { type: 'text', value: 'Hello, world!' }
context.renderChildren([node])
// <span class="yozora-text">Hello, world!</span>
```

Custom renderers should use `escapeHtml` for literal text and `escapeAttribute` for attributes.
`context.sanitize` strips tags from HTML fragments. Default link/image renderers allow relative
URLs and the `http`, `https`, `mailto`, `tel` and `ftp` protocols.

## Styles

CSS is opt-in. Choose **one** entry:

* `@yozora/html-markdown/style.css` — standalone styles; `lib/index.css` remains an alias.
* `@yozora/html-markdown/tailwind.css` — requires a Tailwind v4 build; styles use the
  `components` layer so utilities can override them.

Loading both makes the standalone rules override layered utilities. Set `--yozora__*`
variables directly on `.yozora-markdown`, where the defaults are declared:

```css
.yozora-markdown {
  --yozora__link-color: #4f46e5;
  --yozora__code-font-size: 14px;
}
```

For Tailwind, place overrides in `@layer components` after the imports. The host controls
the page background and dark-mode trigger; see the [demo theme][demo-theme] for a complete
palette. Admonition headings and icons can be styled independently with
`--yozora__admonition-heading-color` and `--yozora__admonition-icon-color`.

### Tailwind CSS v4

Replace the standalone CSS import with these imports in your application CSS:

```css
@import 'tailwindcss';
@import '@yozora/html-markdown/tailwind.css';
```

Pass complete utility class names from source files Tailwind scans:

```typescript
const html = renderMarkdown(root, {}, {}, undefined, {
  className: 'mx-auto max-w-3xl px-4 [&_h2]:text-xl [&_a]:underline',
})
```

Use `@source` for files outside Tailwind's detected paths; runtime-generated HTML and class
fragments such as `text-${size}` are not scanned. The package's `yozora-*` classes need no
source registration. Theme mappings support Tailwind prefixes; your own variables and
utility classes must use the configured prefix too.

With `@tailwindcss/typography`, you may instead omit both stylesheets and pass
`className: 'prose dark:prose-invert'`. Supply your own admonition, math and footnote styles.

### Code blocks

Code blocks include a language toolbar, line numbers and scoped Prism colors. Default Prism
grammars plus TypeScript (`typescript` / `ts`) are registered; unknown languages are escaped
plain text. The `.yozora-code__pre > code` area supports keyboard scrolling and copying
without line numbers. Code metadata is not interpreted.

Customize the `--yozora__code-*` variables; set `--yozora__code-line-numbers-display: none`
to hide the gutter. Highlighted output retains only `span` elements and `class` attributes,
including output from custom Prism hooks. Hooks still execute as application code;
HTML sanitization does not sandbox them.

## Footnotes

`footnoteDefinitionMap` is the footer's source: include nested definitions as well. Definition
nodes are skipped in the body, and mapped definitions render once without mutating the AST.
Repeated references share a definition; its backlink targets the first reference when present.

The footer uses the supplied renderer map and omits definitions whose renderer returns `''`.
Custom wrappers can delegate to `defaultRendererMap` to preserve links. Backlinks are
precomputed from standard AST children and admonition titles: renderers that add or hide
references must manage the affected links or normalize the AST before rendering.

## Migration

* Replace `@yozora/core-html-renderer` imports and dependencies with `@yozora/html-markdown`.
  `createNodesRendererContext` remains an alias of `createNodeRendererContext`; both use the
  complete `defaultRendererMap`.
* Replace `@yozora/html-admonition` imports with the named `renderAdmonition` export.
  Custom contexts still need only `sanitize` and `renderChildren`. Standalone admonitions
  need a `.yozora-markdown` wrapper for the default theme variables.
* `.yozora-code` is now a `div`; target `.yozora-code__pre` for `pre` styles. Prism hook
  markup is limited to `span.class`.

The default export remains `renderMarkdown`. See the [changelog](CHANGELOG.md) for release details.

[demo-theme]: https://github.com/yozorajs/yozora-html/blob/main/packages/demo/src/theme.css
