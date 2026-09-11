# @yozora/core-html-renderer

[![npm version](https://img.shields.io/npm/v/@yozora/core-html-renderer)](https://www.npmjs.com/package/@yozora/core-html-renderer)
[![Tested with Vitest](https://img.shields.io/badge/tested_with-Vitest-6E9F18?logo=vitest)](https://vitest.dev)

Render standard Yozora Markdown AST nodes into HTML strings. This package supplies the
base renderer map and rendering context used by
[@yozora/html-markdown](../html-markdown/README.md).

## Install

```sh
pnpm add @yozora/core-html-renderer @yozora/ast
```

Requires Node.js `^22.13.0 || >=24`. ESM, CommonJS and TypeScript declarations are included.

## Usage

```ts
import type { Text } from '@yozora/ast'
import { createNodeRendererContext } from '@yozora/core-html-renderer'

const context = createNodeRendererContext({}, {})
const node: Text = { type: 'text', value: 'Hello, world!' }

context.renderChildren([node])
// <span class="yozora-text">Hello, world!</span>
```

`createNodeRendererContext(definitionMap, footnoteDefinitionMap, rendererMap?)` provides
`renderChildren`, `sanitize`, `getDefinition` and `getFootnoteDefinition`. Pass definitions
indexed by identifier to resolve link and image references. To customize rendering, spread
`defaultRendererMap` into a new map and override the relevant node renderer.

Individual renderers are also exported, including `renderCode`, `renderLink`, `renderImage`,
`renderList` and `renderTable`. The base map handles standard Markdown nodes; use
`@yozora/html-markdown` for document wrappers, admonitions, math and footnotes.

## Tests

From the repository root:

```sh
pnpm --filter @yozora/core-html-renderer test
pnpm --filter @yozora/core-html-renderer test:coverage
```

See the [test guide](__test__/README.md) for module coverage and assertion conventions.
