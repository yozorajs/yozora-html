# Markdown renderer tests

[![Tested with Vitest](https://img.shields.io/badge/tested_with-Vitest-6E9F18?logo=vitest)](https://vitest.dev)

## Run

From the repository root:

```sh
pnpm --filter @yozora/html-markdown test
pnpm --filter @yozora/html-markdown test -- __test__/footnotes/
pnpm --filter @yozora/html-markdown test:coverage
```

Specs are grouped by renderer; [footnotes/](footnotes/) covers references and document-level
linking. [helper.ts](helper.ts) creates fixtures and fresh contexts. The [fixtures](fixtures/)
and [snapshots](__snapshots__/) live alongside the tests. Tests resolve to source and enforce
100% statements, branches, functions and lines coverage.

Assert observable HTML behavior and input preservation. Use distinct identifiers, labels
and body text in reference fixtures; assert items exist before comparing their order.
For intentional HTML changes, run `pnpm --filter @yozora/html-markdown test:update` and
inspect the snapshot diff.
