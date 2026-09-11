# Core HTML renderer tests

[![Tested with Vitest](https://img.shields.io/badge/tested_with-Vitest-6E9F18?logo=vitest)](https://vitest.dev)

Tests follow the package-local `__test__/*.spec.ts` organization used in sora. Each spec
groups related behavior with `describe` and uses explicit assertions for HTML output.

| File | Focus |
| --- | --- |
| [rendererMap.spec.ts](rendererMap.spec.ts) | Context isolation, definition lookup, custom dispatch, empty input and warnings |
| [text.spec.ts](text.spec.ts) | Text, container nodes, headings and breaks |
| [code.spec.ts](code.spec.ts) | Prism highlighting, unsupported languages and inline code |
| [resource.spec.ts](resource.spec.ts) | Links, images, definitions and title fallback |
| [list.spec.ts](list.spec.ts) | Ordered and unordered lists, task status |
| [table.spec.ts](table.spec.ts) | Header/body output and column alignment |
| [helper.ts](helper.ts) | Text fixtures and rendering through a fresh real context |

## Run

From the repository root:

```sh
pnpm --filter @yozora/core-html-renderer test
pnpm --filter @yozora/core-html-renderer test -- __test__/code.spec.ts
pnpm --filter @yozora/core-html-renderer test:coverage
```

The [shared Vitest config](../../../vitest.config.ts) enforces 100% statements, branches,
functions and lines coverage for this package's `src/` files. Test helpers are excluded.

## Adding cases

- Import the package API from `../src`; keep fixtures and helpers within this package.
- Use real rendering contexts and dependencies. Restore any spies after each test.
- Derive expected HTML from the AST contract, including literal content preservation.
- Give independently sourced fixture values distinct contents so incorrect lookups are visible.
- Assert that all expected content exists before comparing its order.
