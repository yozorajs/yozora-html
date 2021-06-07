<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-html/tree/main/packages/image#readme">@yozora/html-image</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/html-image">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/html-image.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-image">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/html-image.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-image">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/html-image.svg"
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
        src="https://img.shields.io/node/v/@yozora/html-image"
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

This component is for rendering the Yozora Markdown AST node [`Image`][@yozora/ast] 
produced by [@yozora/tokenizer-image][] into HTML string.

This component has been built into [@yozora/html-markdown][], you can use it directly.

## Install

* npm

  ```bash
  npm install --save @yozora/html-image
  ```

* yarn

  ```bash
  yarn add @yozora/html-image
  ```


## Usage

* Basic:

  ```tsx
  import React from 'react'
  import type { Image } from '@yozora/ast'
  import renderImage from '@yozora/html-image'

  const image: Image = {
    "type": "image",
    "url": "https://github.com/favicon.svg/",
    "alt": "github favicon",
    "title": "github favicon"
  }
  renderImage(image)
  // => <img class="yozora-image" alt="github favicon src="https://github.com/favicon.svg/" title="github favicon"
  ```

## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/react-image][]
* [@yozora/tokenizer-image][]
* [Image | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#image
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-image]: https://www.npmjs.com/package/@yozora/tokenizer-image
[@yozora/react-image]: https://www.npmjs.com/package/@yozora/react-image
[mdast]: https://github.com/syntax-tree/mdast#image
