<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-html/tree/main/packages/emphasis#readme">@yozora/html-emphasis</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/html-emphasis">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/html-emphasis.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-emphasis">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/html-emphasis.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-emphasis">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/html-emphasis.svg"
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
        src="https://img.shields.io/node/v/@yozora/html-emphasis"
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

This component is for rendering the Yozora Markdown AST node [`Emphasis`][@yozora/ast] 
produced by [@yozora/tokenizer-emphasis][] into HTML string.

This component has been built into [@yozora/html-markdown][], you can use it directly.

## Install

* npm

  ```bash
  npm install --save @yozora/html-emphasis
  ```

* yarn

  ```bash
  yarn add @yozora/html-emphasis
  ```


## Usage

* Basic:

  ```typescript
  import type { Emphasis } from '@yozora/ast'
  import renderEmphasis from '@yozora/html-emphasis'

  // The implementation of the following function has been omitted.
  const renderChildren: (nodes: YastNode[]) => string = function () {}

  const emphasis = {
    "type": "emphasis",
    "children": [
      {
        "type": "text",
        "value": "yozora is cool!"
      }
    ]
  }
  renderEmphasis(emphasis as Emphasis, renderChildren)
  // => <em class="yozora-emphasis"><span class="yozora-text">yozora is cool!</span></em>
  ```

## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/react-emphasis][]
* [@yozora/tokenizer-emphasis][]
* [Emphasis | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#emphasis
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-emphasis]: https://www.npmjs.com/package/@yozora/tokenizer-emphasis
[@yozora/react-emphasis]: https://www.npmjs.com/package/@yozora/react-emphasis
[mdast]: https://github.com/syntax-tree/mdast#emphasis
