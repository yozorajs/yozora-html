# Admonition tests

[![Tested with Vitest](https://img.shields.io/badge/tested_with-Vitest-6E9F18?logo=vitest)](https://vitest.dev)

[admonition.spec.ts](admonition.spec.ts) groups keyword aliases, default titles, custom
titles and child rendering. It uses the shared [rendering context](../../../vitest.setup.ts)
to exercise integration with the Markdown renderer. The existing basic HTML fixture is
recorded in [the snapshot file](__snapshots__/admonition.spec.ts.snap).

## Run

From the repository root:

```sh
pnpm --filter @yozora/html-admonition test
pnpm --filter @yozora/html-admonition test:coverage
```

Coverage thresholds are 100% for statements, branches, functions and lines. Add focused
assertions for new keyword or title behavior; use snapshots for the complete HTML structure.
For an intentional HTML change, run `pnpm --filter @yozora/html-admonition test:update`
and inspect the snapshot diff before committing it.
