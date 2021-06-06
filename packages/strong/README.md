<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-html/tree/main/packages/strong#readme">@yozora/html-strong</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/html-strong">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/html-strong.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-strong">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/html-strong.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-strong">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/html-strong.svg"
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
        src="https://img.shields.io/node/v/@yozora/html-strong"
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

This component is for rendering the Yozora Markdown AST node [`Strong`][@yozora/ast] 
produced by [@yozora/tokenizer-strong][] into HTML string.

This component has been built into [@yozora/html-markdown][], you can use it directly.

## Install

* npm

  ```bash
  npm install --save @yozora/html-strong
  ```

* yarn

  ```bash
  yarn add @yozora/html-strong
  ```


## Usage

* Basic:

  ```tsx
  import React from 'react'
  import type { Strong } from '@yozora/ast'
  import { StrongType } from '@yozora/ast'
  import renderStrong from '@yozora/html-strong'

  // The implementation of the following function has been omitted.
  const renderChildren: (nodes: YastNode[]) => string = function () {}

  const strong: Strong = {
    type: StrongType,
    children: [
      {
        type: TextType,
        value: 'Hello',
      } as Text,
      {
        type: TextType,
        value: 'World',
      } as Text,
    ],
  }
  renderStrong(strong, renderChildren)
  // => <strong class="yozora-strong"><span class="yozora-text">Hello</span><span class="yozora-text">World</span></strong>
  ```

## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/react-strong][]
* [@yozora/tokenizer-strong][]
* [Strong | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#strong
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-strong]: https://www.npmjs.com/package/@yozora/tokenizer-strong
[@yozora/react-strong]: https://www.npmjs.com/package/@yozora/react-strong
[mdast]: https://github.com/syntax-tree/mdast#strong
