<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-html/tree/main/packages/admonition#readme">@yozora/html-admonition</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/html-admonition">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/html-admonition.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-admonition">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/html-admonition.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-admonition">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/html-admonition.svg"
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
        src="https://img.shields.io/node/v/@yozora/html-admonition"
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

This component is for rendering the Yozora Markdown AST node [`IAdmonition`][@yozora/ast] 
produced by [@yozora/tokenizer-admonition][] into HTML string.

This component has been built into [@yozora/html-markdown][], you can use it directly.

## Install

* npm

  ```bash
  npm install --save @yozora/html-admonition
  ```

* yarn

  ```bash
  yarn add @yozora/html-admonition
  ```


## Usage

* Basic:

  ```typescript
  import type { IAdmonition, IYastNode } from '@yozora/ast'
  import renderAdmonition from '@yozora/html-admonition'

  // The implementation of the following function has been omitted.
  const renderChildren: (nodes: IYastNode[]) => string = function () {}

  const admonition = {
    "type": "admonition",
    "keyword": "note",
    "title": [
      {
        "type": "text",
        "value": "optional title"
      }
    ],
    "children": [
      {
        "type": "paragraph",
        "children": [
          {
            "type": "text",
            "value": "some content"
          }
        ]
      }
    ]
  }
  renderAdmonition(admonition as IAdmonition, renderChildren)
  // => <div class="yozora-admonition yozora-admonition--default"><div class="yozora-admonition__heading"><h5><span class="yozora-text">optional title</span></h5></div><div class="yozora-admonition__body"><p class="yozora-paragraph"><span class="yozora-text">some content</span></p></div></div>
  ```

## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/react-admonition][]
* [@yozora/tokenizer-admonition][]
* [remark-admonitions][]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#admonition
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-admonition]: https://www.npmjs.com/package/@yozora/tokenizer-admonition
[@yozora/react-admonition]: https://www.npmjs.com/package/@yozora/react-admonition
[remark-admonitions]: https://github.com/elviswolcott/remark-admonitions
