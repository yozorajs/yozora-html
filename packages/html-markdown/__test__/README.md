# Markdown renderer tests

[![Tested with Vitest](https://img.shields.io/badge/tested_with-Vitest-6E9F18?logo=vitest)](https://vitest.dev)

| File | Focus |
| --- | --- |
| [context.spec.ts](context.spec.ts) | Factory alias compatibility, complete default map, context isolation, definition lookup, custom dispatch and warnings |
| [admonition.spec.ts](admonition.spec.ts) | Public renderer and minimal context compatibility, keyword aliases, icons, default/custom titles and child rendering |
| [text.spec.ts](text.spec.ts) | Text, container nodes, headings and breaks |
| [code.spec.ts](code.spec.ts) | Prism highlighting, unsupported languages and inline code |
| [resource.spec.ts](resource.spec.ts) | Links, images, definitions and title fallback |
| [escaping.spec.ts](escaping.spec.ts) | Attribute quoting, URL protocols and inline code structure |
| [list.spec.ts](list.spec.ts) | Ordered and unordered lists, task status |
| [table.spec.ts](table.spec.ts) | Header/body output and column alignment |
| [markdown.spec.ts](markdown.spec.ts) | Complete AST rendering, extension integration and the existing HTML snapshot |
| [renderMarkdown.spec.ts](renderMarkdown.spec.ts) | Root classes and attribute escaping, empty documents, custom renderers, references and context integration |
| [footnotes/render.spec.ts](footnotes/render.spec.ts) | Reference identifier encoding, labels and definition output |
| [footnotes/document.spec.ts](footnotes/document.spec.ts) | Reference precomputation, cross-footnote links, delegated renderers, HTML post-processing and failure isolation |
| [math.spec.ts](math.spec.ts) | Block/inline math and empty values |

The [basic AST fixture](fixtures/basic.json) and
[HTML snapshot](__snapshots__/markdown.spec.ts.snap) remain beside the specs. Workspace
aliases resolve to source so integration tests exercise the current renderer implementation.
The [admonition snapshot](__snapshots__/admonition.spec.ts.snap) retains the former standalone
package's basic HTML fixture.

## Run

From the repository root:

```sh
pnpm --filter @yozora/html-markdown test
pnpm --filter @yozora/html-markdown test -- __test__/footnotes/
pnpm --filter @yozora/html-markdown test:coverage
```

The shared configuration enforces 100% statements, branches, functions and lines coverage
for this package, including the standard-node renderers and context implementation.
`helper.ts` creates text fixtures and fresh rendering contexts for node-focused tests.

Add module-specific assertions for observable rendering behavior and input preservation.
Use different identifiers, labels and body text in reference fixtures. When checking ordering,
first assert the presence of every expected item. Update snapshots only for intentional HTML
changes with `pnpm --filter @yozora/html-markdown test:update`, then inspect the diff.
