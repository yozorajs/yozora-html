# @yozora/demo

Private Vite demo of the renderer's public entrypoints. Compare standalone and Tailwind v4
styles with light/dark themes, utility overrides and a narrow-column preview.

## Run

From the repository root:

```sh
pnpm demo
```

Open [Tailwind](http://127.0.0.1:7301/) or [standalone](http://127.0.0.1:7301/standalone.html).
Controls persist in the URL. The narrow-column toggle changes content width; resize the
browser to check responsive breakpoints. Math remains plain text.

For a production preview:

```sh
pnpm build
pnpm --filter @yozora/demo preview
```

Both servers require port **7301** to be free. Output is written to `packages/demo/dist/`.

## Editing

* [src/sample.ts](src/sample.ts) — shared AST and footnotes.
* [src/main.ts](src/main.ts), [src/shell.html](src/shell.html), [src/shell.css](src/shell.css) — controls and layout.
* [src/tailwind.css](src/tailwind.css), [src/standalone.css](src/standalone.css) — public CSS imports.
* [src/theme.css](src/theme.css) — host theme, layered for Tailwind and unlayered for standalone.

The demo renders HTML at build time. **Restart `pnpm demo` after changing library source or
CSS** to rebuild its entrypoints.

## Validation

After `pnpm build`, run `pnpm --filter @yozora/demo test` for Tailwind integration checks;
these also run with the root `pnpm test:coverage` command.

Inspect both pages for theme contrast, utility overrides, list markers, footnote links and
narrow-viewport overflow. Check that code scrolls by keyboard and copies without line numbers.
