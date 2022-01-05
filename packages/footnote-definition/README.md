<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-html/tree/main/packages/break#readme">@yozora/html-footnote-definition</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/html-footnote-definition">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/html-footnote-definition.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-footnote-definition">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/html-footnote-definition.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-footnote-definition">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/html-footnote-definition.svg"
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
        src="https://img.shields.io/node/v/@yozora/html-footnote-definition"
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

This component is for rendering the Yozora Markdown AST node [`IFootnoteDefinition`][@yozora/ast] 
produced by [@yozora/tokenizer-footnote-definition][] into HTML string.

This component has been built into [@yozora/html-markdown][], you can use it directly.

## Install

* npm

  ```bash
  npm install --save @yozora/html-footnote-definition
  ```

* yarn

  ```bash
  yarn add @yozora/html-footnote-definition
  ```


## Usage

* Basic:

  ```typescript
  import type { IFootnoteDefinition } from '@yozora/ast'
  import renderFootnoteDefinitions from '@yozora/html-footnote-definition'

  const nodes: IFootnoteDefinition[] = [
      {
        type: 'footnoteDefinition',
        identifier: 'bravo',
        label: 'Bravo',
        children: [
          {
            type: 'text',
            value: 'bravo and charlie.',
          } as IText,
        ],
      },
    ]
  renderFootnoteReference({ nodes }, rendererChildren)
  // => <div class="yozora-footnote-definition">
  //      <div class="yozora-footnote-definition__title">footnote-definition</div>
  //      <ul class="yozora-footnote-definition__main">
  //        <li id=bravo class="yozora-footnote-definition__item">
  //          <p class="yozora-footnote-definition__item-title yozora-paragraph">
  //            <a href=#reference-bravo>&uarr;</a>
  //              <span>Bravo</span>
  //          </p>
  //          <div class="yozora-footnote-definition__item-content">
  //            <span class="yozora-text">bravo and charlie.</span>
  //          </div>
  //        </li>
  //      </ul>
  //    </div>
  ```

## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/react-footnote-definition][]
* [@yozora/tokenizer-footnote][]
* [@yozora/tokenizer-footnote-reference][]
* [@yozora/tokenizer-footnote-definitions][]
* [Break | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#break
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/react-footnote-definition]: https://www.npmjs.com/package/@yozora/react-footnote-definition
[@yozora/tokenizer-footnote]: https://www.npmjs.com/package/@yozora/tokenizer-footnote
[@yozora/tokenizer-footnote-reference]: https://www.npmjs.com/package/@yozora/tokenizer-footnote-reference
[@yozora/tokenizer-footnote-definitions]: https://www.npmjs.com/package/@yozora/tokenizer-footnote-definitions
[mdast]: https://github.com/syntax-tree/mdast#break
