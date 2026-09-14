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

```typescript
import type { Root } from '@yozora/ast'
import { renderMarkdown } from '@yozora/html-markdown'
import '@yozora/html-markdown/style.css'

const paragraph = {
  type: 'paragraph',
  children: [{ type: 'text', value: 'yozora is cool!' }],
}
const root: Root = { type: 'root', children: [paragraph] }

const html = renderMarkdown(root, {}, {})
```

The output is a `section.yozora-markdown` containing `main` and `footer` elements.
The optional fourth argument is a renderer map. The optional fifth argument accepts
`IRenderMarkdownOptions`: `className` adds HTML-escaped classes to the root section,
preserving `yozora-markdown`. Pass `undefined` for the fourth argument to use the default
renderers with custom classes.

### Styles

JavaScript imports do not load CSS. Choose one stylesheet in your application:

* `@yozora/html-markdown/style.css`: standalone default styles, with no Tailwind dependency.
  The previously documented `@yozora/html-markdown/lib/index.css` is an alias for this file.
* `@yozora/html-markdown/tailwind.css`: default styles in Tailwind v4's `components` layer,
  followed by mappings to the host's theme variables. Process this entry with Tailwind v4;
  its `--theme(...)` references are resolved at build time. It adds no JavaScript or Tailwind
  runtime dependency. Use `style.css` for direct browser loading without a Tailwind build.

Do not load both entries: the unlayered standalone styles would override normal layered
utilities. Colors, fonts and spacing are customizable through `--yozora__*` CSS variables
on `.yozora-markdown`; setting variables only on an ancestor does not override defaults
declared on the section itself. Syntax highlighting colors require a separate Prism theme.
Admonition headings inherit the block's text color independently of the border color.
Override `--yozora__admonition-heading-color` to customize their foreground color.

### Tailwind CSS v4

In an application that already builds Tailwind v4, add these imports to its CSS entry:

```css
@import 'tailwindcss';
@import '@yozora/html-markdown/tailwind.css';
```

The integration declares the order `theme, base, components, utilities`. Preflight runs
before the component styles; lists explicitly retain their markers, and utilities can
override component declarations regardless of their selector specificity. The adapter maps
Tailwind's `--font-sans`, `--font-mono`, `--spacing` and palette variables to Yozora tokens,
with fallback values for missing tokens. It does not include Preflight or utilities itself.
Theme references also follow a configured prefix, such as `@import 'tailwindcss' prefix(tw)`;
compiled mappings retain `var(--tw-...)` references so host variables can still change at runtime.
When writing additional host CSS, use its prefixed variable names (for example,
`var(--tw-color-indigo-600)`) and prefix utility classes according to the Tailwind configuration.

Pass complete, statically discoverable class names from your application source:

```typescript
const html = renderMarkdown(root, {}, {}, undefined, {
  className: 'mx-auto max-w-3xl px-4 [&_h2]:text-xl [&_a]:underline',
})
```

Tailwind must scan the file containing these strings. It does not discover classes from
runtime-generated HTML or expressions such as `text-${size}`. Use complete literal class
maps; when the source is outside Tailwind's detected paths, register it with `@source` in
the application CSS. The package's semantic `yozora-*` classes need no source registration.

The host controls its theme and dark-mode trigger. For example, place these rules after the
imports to use an ancestor or root `.dark` class and your Tailwind palette:

```css
@custom-variant dark (&:where(.dark, .dark *));

@layer components {
  .yozora-markdown {
    --yozora__link-color: var(--color-indigo-600);
    --yozora__link-color-hover: var(--color-indigo-500);

    @variant dark {
      --yozora__color-bg-primary: var(--color-slate-950);
      --yozora__color-bg-secondary: var(--color-slate-900);
      --yozora__color-bg-tertiary: var(--color-slate-800);
      --yozora__color-text-primary: var(--color-slate-200);
      --yozora__color-text-secondary: var(--color-slate-300);
      --yozora__color-text-tertiary: var(--color-slate-400);
      --yozora__color-border-primary: var(--color-slate-700);
      --yozora__color-border-secondary: var(--color-slate-700);
      --yozora__color-border-tertiary: var(--color-slate-600);
      --yozora__link-color: var(--color-indigo-400);
      --yozora__link-color-hover: var(--color-indigo-300);
      --yozora__inline-code-color: var(--color-rose-400);
      --yozora__admonition-info-bg: var(--color-sky-950);
      --yozora__admonition-tip-bg: var(--color-green-950);
      --yozora__admonition-caution-bg: var(--color-amber-950);
      --yozora__admonition-danger-bg: var(--color-red-950);
    }
  }
}
```

The host supplies the page background. Blockquotes, code blocks and tables follow the
shared background tokens. This example uses the application's `dark` variant; the adapter
does not select a dark-mode strategy or require the legacy `yozora-markdown--darken` class.

If your application uses `@tailwindcss/typography`, you can instead omit both Yozora stylesheets
and set `className: 'prose dark:prose-invert'`. Typography handles standard Markdown elements;
provide your own styles for Yozora's admonitions, math and footnote layout. Avoid combining
both full typography presets unless you explicitly manage their overlapping rules.

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
