<header>
  <h1 align="center">
    <a href="https://github.com/yozorajs/yozora-html#readme">Yozora HTML</a>
  </h1>
  <div align="center">
    <a href="#license">
      <img
        alt="License"
        src="https://img.shields.io/github/license/yozorajs/yozora-html"
      />
    </a>
    <a href="https://github.com/yozorajs/yozora-html/tags">
      <img
        alt="Package Version"
        src="https://img.shields.io/github/v/tag/yozorajs/yozora-html?include_prereleases&sort=semver"
      />
    </a>
    <a href="https://github.com/yozorajs/yozora-html/search?l=typescript">
      <img
        alt="Github Top Language"
        src="https://img.shields.io/github/languages/top/yozorajs/yozora-html"
      />
    </a>
    <a href="https://github.com/nodejs/node">
      <img
        alt="Node.js Version"
        src="https://img.shields.io/node/v/@yozora/html-blockquote"
      />
    </a>
    <a href="https://github.com/yozorajs/yozora-html/actions/workflows/ci.yml">
      <img
        alt="CI Workflow"
        src="https://github.com/yozorajs/yozora-html/workflows/Build/badge.svg?branch=main"
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

Render [Yozora AST](https://www.npmjs.com/package/@yozora/ast) into HTML strings, with
standalone styles or Tailwind CSS v4 integration.

* [@yozora/html-markdown](packages/html-markdown/README.md) — installation, rendering and styling.
* [Demo](packages/demo/README.md) — run `pnpm demo` to compare both styles at `http://127.0.0.1:7301/`.

## Development

Use pnpm 12.3.4 and Node.js 22.22.1+, 24.11.0+ or 26.x.

```sh
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm build
pnpm test:build --sourcemap
pnpm test:coverage
```

`pnpm build` builds the library and private demo. `pnpm build:production` omits library
source maps; verify it with `pnpm test:build --no-sourcemap`. `pnpm format` applies Biome fixes.
See the [test guide](packages/html-markdown/__test__/README.md) for focused runs and snapshots.

## Releases

Only `@yozora/html-markdown` is published.

1. Update its `package.json` version and `CHANGELOG.md`, then run `pnpm docs:links` and
   `pnpm install --lockfile-only`.
2. Run `pnpm run :publish:prepare` and `pnpm run :publish:verify` to build and validate locally.
3. Review and commit the changes, then run `pnpm run :publish` from `main`.

Publishing repeats the validation and publishes unpublished versions; it does not create
version bumps or Git tags. Use `pnpm run :publish-recover` to retry an interrupted release.

## License

[MIT](LICENSE)
