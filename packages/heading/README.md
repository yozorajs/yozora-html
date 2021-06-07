<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-html/tree/main/packages/heading#readme">@yozora/html-heading</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/html-heading">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/html-heading.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-heading">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/html-heading.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-heading">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/html-heading.svg"
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
        src="https://img.shields.io/node/v/@yozora/html-heading"
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

This component is for rendering the Yozora Markdown AST node [`Heading`][@yozora/ast] 
produced by [@yozora/tokenizer-heading][] into HTML string.

This component has been built into [@yozora/html-markdown][], you can use it directly.

## Install

* npm

  ```bash
  npm install --save @yozora/html-heading
  ```

* yarn

  ```bash
  yarn add @yozora/html-heading
  ```


## Usage

* Basic:

  ```tsx
  import React from 'react'
  import type { Heading } from '@yozora/ast'
  import renderHeading from '@yozora/html-heading'

  // The implementation of the following function has been omitted.
  const renderChildren: (nodes: YastNode[]) => string = function () {}

  const heading = {
    "type": "heading",
    "depth": 1,
    "children": [
      {
        "type": "text",
        "value": "yozora is cool!"
      }
    ]
  }
  renderHeading(heading as Heading, renderChildren)
  // => <h1 className="yozora-heading"><p className="yozora-heading__content"><span class="yozora-text">yozora is cool!</span></p></h1>
  ```

* With identifier:

  ```tsx
  import React from 'react'
  import type { Heading } from '@yozora/ast'
  import { HeadingType } from '@yozora/ast'
  import renderHeading from '@yozora/html-heading'

  // The implementation of the following function has been omitted.
  const renderChildren: (nodes: YastNode[]) => string = function () {}

  const heading: Heading = {
    type: HeadingType,
    depth: 1,
    children: [
      {
        type: EmphasisType,
        children: [
          {
            type: TextType,
            value: 'Hello',
          } as Text,
        ],
      } as Emphasis,
      {
        type: TextType,
        value: ', ',
      } as Text,
      {
        type: StrongType,
        children: [
          {
            type: TextType,
            value: 'World',
          } as Text,
        ],
      } as Strong,
    ],
  }
  renderHeading(heading, renderChildren)
  // => <h6 id="waw" className="yozora-heading yozora-heading--toc"><p className="yozora-heading__content"><em class="yozora-emphasis"><span class="yozora-text">Hello</span></em><span class="yozora-text">, </span><strong class="yozora-strong"><span class="yozora-text">World</span></strong></p><a className="yozora-heading__anchor" href="#waw">¶</a></h6>
  ```

## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/react-heading][]
* [@yozora/tokenizer-heading][]
* [Heading | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#heading
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-heading]: https://www.npmjs.com/package/@yozora/tokenizer-heading
[@yozora/react-heading]: https://www.npmjs.com/package/@yozora/react-heading
[mdast]: https://github.com/syntax-tree/mdast#heading
