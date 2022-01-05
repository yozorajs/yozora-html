<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-html/tree/main/packages/break#readme">@yozora/html-break</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/html-break">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/html-break.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-break">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/html-break.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-break">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/html-break.svg"
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
        src="https://img.shields.io/node/v/@yozora/html-break"
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

This component is for rendering the Yozora Markdown AST node [`IBreak`][@yozora/ast] 
produced by [@yozora/tokenizer-break][] into HTML string.

This component has been built into [@yozora/html-markdown][], you can use it directly.

## Install

* npm

  ```bash
  npm install --save @yozora/html-break
  ```

* yarn

  ```bash
  yarn add @yozora/html-break
  ```


## Usage

* Basic:

  ```typescript
  import type { IBreak } from '@yozora/ast'
  import renderBreak from '@yozora/html-break'

  const node: IBreak = { "type": "break" }
  renderBreak(node)
  // => <br class="yozora-break" />
  ```

## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/react-break][]
* [@yozora/tokenizer-break][]
* [Break | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#break
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-break]: https://www.npmjs.com/package/@yozora/tokenizer-break
[@yozora/react-break]: https://www.npmjs.com/package/@yozora/react-break
[mdast]: https://github.com/syntax-tree/mdast#break
