<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-html/tree/main/packages/text#readme">@yozora/html-text</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/html-text">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/html-text.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-text">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/html-text.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-text">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/html-text.svg"
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
        src="https://img.shields.io/node/v/@yozora/html-text"
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

This component is for rendering the Yozora Markdown AST node [`Text`][@yozora/ast] 
produced by [@yozora/tokenizer-text][] into HTML string.

This component has been built into [@yozora/html-markdown][], you can use it directly.

## Install

* npm

  ```bash
  npm install --save @yozora/html-text
  ```

* yarn

  ```bash
  yarn add @yozora/html-text
  ```


## Usage

* Basic:

  ```typescript
  import type { Text } from '@yozora/ast'
  import renderText from '@yozora/html-text'

  const text: Text = { "type": "text", "value": "literal content." }
  renderText(text)
  // => <span class="yozora-text">literal content.</span>
  ```

## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/react-text][]
* [@yozora/tokenizer-text][]
* [Text | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#text
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-text]: https://www.npmjs.com/package/@yozora/tokenizer-text
[@yozora/react-text]: https://www.npmjs.com/package/@yozora/react-text
[mdast]: https://github.com/syntax-tree/mdast#text
