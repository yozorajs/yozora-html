# @yozora/demo

A private Vite application for inspecting the published HTML renderer and stylesheet
entrypoints with real document content. It renders the same typed AST into two separate
pages so standalone CSS and Tailwind's layered CSS cannot interfere with each other.

## Run

From the repository root:

```sh
pnpm demo
```

This builds the renderer's workspace dependencies before starting Vite at
`http://127.0.0.1:7301/`. Both dev and production preview use port 7301 and fail if it is
occupied, so stop one before starting the other. `index.html` uses Tailwind CSS v4 with
Preflight; `standalone.html` loads only
the standalone stylesheet and the demo's host theme. Each page supports light/dark themes
and a narrow content column. The Tailwind page also toggles utility overrides for headings,
links and blockquotes. Settings are read from the URL and stay synchronized on page switches,
reloads and browser history navigation.

The narrow-column control changes content width, not the browser viewport. Resize the
browser or use device emulation when checking responsive breakpoints.

To inspect the production build:

```sh
pnpm build
pnpm --filter @yozora/demo preview
```

The static site is generated in `packages/demo/dist/`. Relative asset URLs allow hosting
it under a subdirectory. The package is private and is skipped by library export checks
and pnpm publishing. Its Vite build is included in the regular workspace build and CI.

## Editing

* `src/sample.ts` contains the shared document and footnote fixtures.
* `src/shell.html`, `src/shell.css` and `src/main.ts` implement the preview controls.
* `src/tailwind.css` imports the public Tailwind CSS entry and scans the literal utility
  classes in `main.ts`; `src/standalone.css` imports the public standalone CSS entry.
* `src/theme.css` is the host application's dark theme. It is imported into `components`
  for Tailwind and remains unlayered for the standalone page.

Rendering happens in Vite's HTML transform using the built `@yozora/html-markdown` package.
The renderer is not bundled into the browser. Vite reloads fixture/config changes and
updates the demo's CSS and controls during development. After changing renderer package
source or its CSS, restart `pnpm demo` to rebuild the published entrypoints.

The sample includes headings, bilingual paragraphs, links, inline code, blockquotes,
ordered/unordered/task lists, code blocks, aligned tables, all five admonition variants,
a local image, math text, repeated footnote references and backlinks. Math text uses a serif
font and the document text color; display formulas are centered with separate spacing.
It remains plain text, without a LaTeX typesetting engine. Prism token colors are not added
by this demo.

## Checking changes

Run `pnpm lint`, `pnpm typecheck`, `pnpm build` and `pnpm test:build --sourcemap` from the root.
After building, `pnpm --filter @yozora/demo test` compiles the published CSS entry in consumers
with no prefix, two different prefixes and removed theme tokens. These integration tests also
run as part of the root `pnpm test:coverage` command; they do not collect JavaScript coverage.
Then inspect both pages in development and production preview:

* List markers and ordered-list start numbers remain visible with Preflight enabled.
* Utilities change second-level headings to 20px, underline links and remove quote borders.
* Dark mode updates document text, code/table backgrounds and all admonition backgrounds.
* Page switches, reloads and browser back/forward navigation preserve controls through URL parameters.
* Admonition titles remain readable in both themes; footnote labels contain one set of brackets.
* Images, tables and code stay within the page on a narrow viewport; footnote links resolve.

The existing library tests continue to cover rendering contracts and attribute escaping.
Demo files are included in the repository's type and lint checks.
