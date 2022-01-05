<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-html/tree/main/packages/break#readme">@yozora/html-footnote-reference</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/html-footnote-reference">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/html-footnote-reference.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-footnote-reference">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/html-footnote-reference.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-footnote-reference">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/html-footnote-reference.svg"
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
        src="https://img.shields.io/node/v/@yozora/html-footnote-reference"
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

This component is for rendering the Yozora Markdown AST node [`IFootnoteReference`][@yozora/ast] 
produced by [@yozora/tokenizer-footnote-reference][] into HTML string.

This component has been built into [@yozora/html-markdown][], you can use it directly.

## Install

* npm

  ```bash
  npm install --save @yozora/html-footnote-reference
  ```

* yarn

  ```bash
  yarn add @yozora/html-footnote-reference
  ```


## Usage

* Basic:

  ```typescript
  import type { IFootnoteReference } from '@yozora/ast'
  import renderFootnoteReference from '@yozora/html-footnote-reference'

  const node: IFootnoteReference = {
    type: 'footnoteReference',
    identifier: 'bravo',
    label: 'bravo',
  }
  renderFootnoteReference(node)
  // => <sup id="reference-bravo" class="yozora-footnote-reference"><a href="#bravo" title="bravo">[bravo]</a></sup>
  ```

## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/react-footnote-reference][]
* [@yozora/tokenizer-footnote][]
* [@yozora/tokenizer-footnote-reference][]
* [@yozora/tokenizer-footnote-definition][]
* [Break | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#break
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/react-footnote-reference]: https://www.npmjs.com/package/@yozora/react-footnote-reference
[@yozora/tokenizer-footnote]: https://www.npmjs.com/package/@yozora/tokenizer-footnote
[@yozora/tokenizer-footnote-reference]: https://www.npmjs.com/package/@yozora/tokenizer-footnote-reference
[@yozora/tokenizer-footnote-definition]: https://www.npmjs.com/package/@yozora/tokenizer-footnote-definition
[mdast]: https://github.com/syntax-tree/mdast#break
