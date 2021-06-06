<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-html/tree/main/packages/list#readme">@yozora/html-list</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/html-list">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/html-list.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-list">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/html-list.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-list">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/html-list.svg"
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
        src="https://img.shields.io/node/v/@yozora/html-list"
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

This component is for rendering the Yozora Markdown AST node [`List`][@yozora/ast__list] 
produced by [@yozora/tokenizer-list][] and [`ListItem`][@yozora/ast__list-item]
produced by [@yozora/tokenizer-list-item][] into HTML string.

This component has been built into [@yozora/html-markdown][], you can use it directly.

## Install

* npm

  ```bash
  npm install --save @yozora/html-list
  ```

* yarn

  ```bash
  yarn add @yozora/html-list
  ```


## Usage

* Basic:

  ```tsx
  import React from 'react'
  import type { List } from '@yozora/ast'
  import renderList from '@yozora/html-list'

  // The implementation of the following function has been omitted.
  const renderChildren: (nodes: YastNode[]) => string = function () {}

  const list = {
    type: 'list',
    ordered: false,
    marker: 45,
    spread: true,
    children: [
      {
        type: 'listItem',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                value: 'a',
              },
            ],
          },
        ],
      },
      {
        type: 'listItem',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                value: 'b',
              },
            ],
          },
        ],
      },
    ],
  }
  renderList(list as List, renderChildren)
  // => <ul class="yozora-list"><li class="yozora-list-item"><p class="yozora-paragraph"><span class="yozora-text">a</span></p></li><li class="yozora-list-item"><p class="yozora-paragraph"><span class="yozora-text">b</span></p></li></ul>
  ```

* List with task items:

  ```tsx
  import React from 'react'
  import type { List } from '@yozora/ast'
  import renderList from '@yozora/html-list'

  // The implementation of the following function has been omitted.
  const renderChildren: (nodes: YastNode[]) => string = function () {}

  const list = {
    type: 'list',
    ordered: false,
    marker: 45,
    spread: false,
    children: [
      {
        type: 'listItem',
        status: 'todo',
        children: [
          {
            type: 'text',
            value: 'foo',
          },
        ],
      },
      {
        type: 'listItem',
        status: 'done',
        children: [
          {
            type: 'text',
            value: 'bar',
          },
        ],
      },
    ],
  }
  renderList(list as List, renderChildren)
  // => <ul class="yozora-list"><li class="yozora-list-item"><input disabled="" type="checkbox" /> <span class="yozora-text">foo</span></li><li class="yozora-list-item"><input checked="" disabled="" type="checkbox" /> <span class="yozora-text">bar</span></li></ul>
  ```

* Ordered list:

  ```tsx
  import React from 'react'
  import type { List } from '@yozora/ast'
  import renderList from '@yozora/html-list'

  // The implementation of the following function has been omitted.
  const renderChildren: (nodes: YastNode[]) => string = function () {}

  const list = {
    type: 'list',
    ordered: true,
    start: 1,
    marker: 46,
    spread: false,
    children: [
      {
        type: 'listItem',
        children: [
          {
            type: 'text',
            value: 'a',
          },
        ],
      },
      {
        type: 'listItem',
        children: [
          {
            type: 'text',
            value: 'b',
          },
        ],
      },
      {
        type: 'listItem',
        children: [
          {
            type: 'text',
            value: 'c',
          },
        ],
      },
    ],
  }
  renderList(list as List, renderChildren)
  // => <ol class="yozora-list" start="1"><li class="yozora-list-item"><span class="yozora-text">a</span></li><li class="yozora-list-item"><span class="yozora-text">b</span></li><li class="yozora-list-item"><span class="yozora-text">c</span></li></ol>
  ```


## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/react-list][]
* [@yozora/react-list-item][]
* [@yozora/tokenizer-list][]
* [@yozora/tokenizer-list-item][]
* [List | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#list
[@yozora/ast-list]: https://www.npmjs.com/package/@yozora/ast#list
[@yozora/ast-list-item]: https://www.npmjs.com/package/@yozora/ast#listitem
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-list]: https://www.npmjs.com/package/@yozora/tokenizer-list
[@yozora/tokenizer-list-item]: https://www.npmjs.com/package/@yozora/tokenizer-list-item
[@yozora/react-list]: https://www.npmjs.com/package/@yozora/react-list
[@yozora/react-list-item]: https://www.npmjs.com/package/@yozora/react-list-item
[mdast]: https://github.com/syntax-tree/mdast#list
