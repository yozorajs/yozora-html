<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-html/tree/main/packages/markdown#readme">@yozora/html-markdown</a>
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
    <a href="https://github.com/facebook/jest">
      <img
        alt="Tested with Jest"
        src="https://img.shields.io/badge/tested_with-jest-9c465e.svg"
      />
    </a>
    <a href="https://github.com/prettier/prettier">
      <img
        alt="Code Style: prettier"
        src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"
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

* yarn

  ```bash
  yarn add @yozora/html-markdown
  ```


## Usage

* Basic:

  ```typescript
  import type { Root } from '@yozora/ast'
  import renderMarkdown from '@yozora/html-markdown'
  import '@yozora/html-markdown/lib/esm/index.css'  // load preset styles.

  const root = {
    "type": "root",
    "children": [
      {
        "type": "markdown",
        "children": [
          {
            "type": "text",
            "value": "yozora is cool!"
          }
        ]
      }
    ]
  }
  renderMarkdown(markdown as markdown, {}, {}, renderChildren)
  // => <markdown class="yozora-markdown"><span class="yozora-text">yozora is cool!</span></markdown>
  ```

## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/react-markdown][]
* [@yozora/tokenizer-markdown][]
* [markdown | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#markdown
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-markdown]: https://www.npmjs.com/package/@yozora/tokenizer-markdown
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[mdast]: https://github.com/syntax-tree/mdast#markdown
