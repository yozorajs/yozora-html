<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-html/tree/main/packages/inline-code#readme">@yozora/html-inline-code</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/html-inline-code">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/html-inline-code.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-inline-code">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/html-inline-code.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-inline-code">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/html-inline-code.svg"
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
        src="https://img.shields.io/node/v/@yozora/html-inline-code"
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

This component is for rendering the Yozora Markdown AST node [`InlineCode`][@yozora/ast] 
produced by [@yozora/tokenizer-inline-code][] into HTML string.

This component has been built into [@yozora/html-markdown][], you can use it directly.

## Install

* npm

  ```bash
  npm install --save @yozora/html-inline-code
  ```

* yarn

  ```bash
  yarn add @yozora/html-inline-code
  ```


## Usage

* Basic:

  ```tsx
  import React from 'react'
  import type { InlineCode } from '@yozora/ast'
  import { InlineCodeType } from '@yozora/ast'
  import renderInlineCode from '@yozora/html-inline-code'

  const inlineCode: InlineCode = { 
    type: InlineCodeType, 
    value: 'dijkstra',
  }
  renderInlineCode(inlineCode)
  // => <code class="yozora-inline-code">dijkstra</code>
  ```

## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/react-inline-code][]
* [@yozora/tokenizer-inline-code][]
* [InlineCode | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#inline-code
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-inline-code]: https://www.npmjs.com/package/@yozora/tokenizer-inline-code
[@yozora/react-inline-code]: https://www.npmjs.com/package/@yozora/react-inline-code
[mdast]: https://github.com/syntax-tree/mdast#inline-code
