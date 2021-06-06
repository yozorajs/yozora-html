<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-html/tree/main/packages/blockquote#readme">@yozora/html-blockquote</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/html-blockquote">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/html-blockquote.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-blockquote">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/html-blockquote.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-blockquote">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/html-blockquote.svg"
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
        src="https://img.shields.io/node/v/@yozora/html-blockquote"
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

This component is for rendering the Yozora Markdown AST node [`Blockquote`][@yozora/ast] 
produced by [@yozora/tokenizer-blockquote][] into HTML string.

This component has been built into [@yozora/html-markdown][], you can use it directly.

## Install

* npm

  ```bash
  npm install --save @yozora/html-blockquote
  ```

* yarn

  ```bash
  yarn add @yozora/html-blockquote
  ```


## Usage

* Basic:

  ```tsx
  import React from 'react'
  import type { Blockquote } from '@yozora/ast'
  import { BlockquoteType } from '@yozora/ast'
  import renderBlockquote from '@yozora/html-blockquote'

  // The implementation of the following function has been omitted.
  const renderChildren: (nodes: YastNode[]) => string = function () {}

  const blockquote: Blockquote = {
    type: BlockquoteType,
    children: [
      {
        type: TextType,
        value: 'yozora is cool!',
      } as Text,
    ],
  }
  renderBlockquote(blockquote, renderChildren)
  // => <blockquote class="yozora-blockquote"><span class="yozora-text">yozora is cool!</span></blockquote>
  ```

## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/react-blockquote][]
* [@yozora/tokenizer-blockquote][]
* [Blockquote | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#blockquote
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-blockquote]: https://www.npmjs.com/package/@yozora/tokenizer-blockquote
[@yozora/react-blockquote]: https://www.npmjs.com/package/@yozora/react-blockquote
[mdast]: https://github.com/syntax-tree/mdast#blockquote
