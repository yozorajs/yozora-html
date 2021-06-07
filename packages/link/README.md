<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-html/tree/main/packages/link#readme">@yozora/html-link</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/html-link">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/html-link.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-link">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/html-link.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-link">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/html-link.svg"
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
        src="https://img.shields.io/node/v/@yozora/html-link"
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

This component is for rendering the Yozora Markdown AST node [`Link`][@yozora/ast] 
produced by [@yozora/tokenizer-link][] into HTML string.

This component has been built into [@yozora/html-markdown][], you can use it directly.

## Install

* npm

  ```bash
  npm install --save @yozora/html-link
  ```

* yarn

  ```bash
  yarn add @yozora/html-link
  ```


## Usage

* Basic:

  ```tsx
  import React from 'react'
  import type { Link } from '@yozora/ast'
  import renderLink from '@yozora/html-link'

  // The implementation of the following function has been omitted.
  const renderChildren: (nodes: YastNode[]) => string = function () {}

  const link = {
    "type": "link",
    "url": "https://github.com/guanghechen/yozora",
    "title": "yozora",
    "children": [
      {
        "type": "text",
        "value": "yozora is cool!"
      }
    ]
  }
  renderLink(link as Link, renderChildren)
  // => <a class="yozora-link" href="https://github.com/guanghechen/yozora" title="yozora" target="_blank" rel="noopener,noreferrer"><span class="yozora-text">yozora is cool!</span></a>
  ```

## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/react-link][]
* [@yozora/tokenizer-link][]
* [Link | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#link
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-link]: https://www.npmjs.com/package/@yozora/tokenizer-link
[@yozora/react-link]: https://www.npmjs.com/package/@yozora/react-link
[mdast]: https://github.com/syntax-tree/mdast#link
