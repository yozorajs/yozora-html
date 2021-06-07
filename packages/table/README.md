<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-html/tree/main/packages/table#readme">@yozora/html-table</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/html-table">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/html-table.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-table">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/html-table.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-table">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/html-table.svg"
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
        src="https://img.shields.io/node/v/@yozora/html-table"
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

This component is for rendering the Yozora Markdown AST node [`Table`][@yozora/ast__table],
[`TableRow`][@yozora/ast__table-row] and [`TableCell`][@yozora/ast__table-cell] 
produced by [@yozora/tokenizer-table][] into HTML string.

This component has been built into [@yozora/html-markdown][], you can use it directly.

## Install

* npm

  ```bash
  npm install --save @yozora/html-table
  ```

* yarn

  ```bash
  yarn add @yozora/html-table
  ```


## Usage

* Basic:

  ```typescript
  import type { Table } from '@yozora/ast'
  import renderTable from '@yozora/html-table'

  // The implementation of the following function has been omitted.
  const renderChildren: (nodes: YastNode[]) => string = function () {}

  const table = {
    "type": "table",
    "columns": [
      { "align": "center" },
      { "align": "right" },
      { "align": null }
    ],
    "children": [
      {
        "type": "tableRow",
        "children": [
          {
            "type": "tableCell",
            "children": [{ "type": "text", "value": "abc" }]
          },
          {
            "type": "tableCell",
            "children": [{ "type": "text", "value": "defghi" }]
          },
          {
            "type": "tableCell",
            "children": [{ "type": "text", "value": "xyz" }]
          }
        ]
      },
      {
        "type": "tableRow",
        "children": [
          {
            "type": "tableCell",
            "children": [{ "type": "text", "value": "bar" }]
          },
          {
            "type": "tableCell",
            "children": [{ "type": "text", "value": "baz" }]
          },
          {
            "type": "tableCell",
            "children": [{ "type": "text", "value": "defghi" }]
          }
        ]
      }
    ]
  }
  renderTable(table as Table, renderChildren)
  // => <table class="yozora-table-item"><thead class="yozora-table__thead"><tr class="yozora-table-row"><th class="yozora-table-cell" align="center"><span class="yozora-text">abc</span></th><th class="yozora-table-cell" align="right"><span class="yozora-text">defghi</span></th><th class="yozora-table-cell"><span class="yozora-text">xyz</span></th></tr></thead><tbody class="yozora-table__tbody"><tr class="yozora-table-row"><td class="yozora-table-cell" align="center"><span class="yozora-text">bar</span></td><td class="yozora-table-cell" align="right"><span class="yozora-text">baz</span></td><td class="yozora-table-cell"><span class="yozora-text">defghi</span></td></tr></tbody></table> 
  ```


## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/react-table][]
* [@yozora/tokenizer-table][]
* [Table | Mdast][mdast]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#table
[@yozora/ast__table]: https://www.npmjs.com/package/@yozora/ast#table
[@yozora/ast__table-row]: https://www.npmjs.com/package/@yozora/ast#tablerow
[@yozora/ast__table-cell]: https://www.npmjs.com/package/@yozora/ast#tablecell
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-table]: https://www.npmjs.com/package/@yozora/tokenizer-table
[@yozora/react-table]: https://www.npmjs.com/package/@yozora/react-table
[mdast]: https://github.com/syntax-tree/mdast#table
