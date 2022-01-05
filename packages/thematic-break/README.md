<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-html/tree/main/packages/thematic-break#readme">@yozora/html-thematic-break</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/html-thematic-break">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/html-thematic-break.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-thematic-break">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/html-thematic-break.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-thematic-break">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/html-thematic-break.svg"
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
        src="https://img.shields.io/node/v/@yozora/html-thematic-break"
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

This component is for rendering the Yozora Markdown AST node [`IThematicBreak`][@yozora/ast] 
produced by [@yozora/tokenizer-thematic-break][] into HTML string.

This component has been built into [@yozora/html-markdown][], you can use it directly.

## Install

* npm

  ```bash
  npm install --save @yozora/html-thematic-break
  ```

* yarn

  ```bash
  yarn add @yozora/html-thematic-break
  ```


## Usage

* Basic:

  ```typescript
  import type { IThematicBreak } from '@yozora/ast'
  import renderThematicBreak from '@yozora/html-thematic-break'

  const thematicBreak: IThematicBreak = { "type": "thematicBreak" }
  renderThematicBreak(thematicBreak)
  // => <hr class="yozora-thematic-break" />
  ```

## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/react-thematic-break][]
* [@yozora/tokenizer-thematic-break][]
* [ThematicBreak | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#thematic-break
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-thematic-break]: https://www.npmjs.com/package/@yozora/tokenizer-thematic-break
[@yozora/react-thematic-break]: https://www.npmjs.com/package/@yozora/react-thematic-break
[mdast]: https://github.com/syntax-tree/mdast#thematic-break
