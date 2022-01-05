<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-html/tree/main/packages/delete#readme">@yozora/html-delete</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/html-delete">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/html-delete.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-delete">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/html-delete.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-delete">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/html-delete.svg"
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
        src="https://img.shields.io/node/v/@yozora/html-delete"
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

This component is for rendering the Yozora Markdown AST node [`IDelete`][@yozora/ast] 
produced by [@yozora/tokenizer-delete][] into HTML string.

This component has been built into [@yozora/html-markdown][], you can use it directly.

## Install

* npm

  ```bash
  npm install --save @yozora/html-delete
  ```

* yarn

  ```bash
  yarn add @yozora/html-delete
  ```


## Usage

* Basic:

  ```typescript
  import type { IDelete, IYastNode } from '@yozora/ast'
  import renderDelete from '@yozora/html-delete'

  // The implementation of the following function has been omitted.
  const renderChildren: (nodes: IYastNode[]) => string = function () {}

  const node = {
    "type": "delete",
    "children": [
      {
        "type": "text",
        "value": "yozora is cool!"
      }
    ]
}
  renderDelete(node as Delete, renderChildren)
  // => <del class="yozora-delete"><span class="yozora-text">yozora is cool!</span></del>
  ```

## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/react-delete][]
* [@yozora/tokenizer-delete][]
* [Delete | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#delete
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-delete]: https://www.npmjs.com/package/@yozora/tokenizer-delete
[@yozora/react-delete]: https://www.npmjs.com/package/@yozora/react-delete
[mdast]: https://github.com/syntax-tree/mdast#delete
