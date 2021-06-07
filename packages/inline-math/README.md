<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-html/tree/main/packages/inline-math#readme">@yozora/html-inline-math</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/html-inline-math">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/html-inline-math.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-inline-math">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/html-inline-math.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-inline-math">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/html-inline-math.svg"
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
        src="https://img.shields.io/node/v/@yozora/html-inline-math"
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
        alt="Math Style: prettier"
        src="https://img.shields.io/badge/math_style-prettier-ff69b4.svg?style=flat-square"
      />
    </a>
  </div>
</header>
<br/>

This component is for rendering the Yozora Markdown AST node [`InlineMath`][@yozora/ast] 
produced by [@yozora/tokenizer-inline-math][] into HTML string.

This component has been built into [@yozora/html-markdown][], you can use it directly.

## Install

* npm

  ```bash
  npm install --save @yozora/html-inline-math
  ```

* yarn

  ```bash
  yarn add @yozora/html-inline-math
  ```


## Usage

* Basic:

  ```tsx
  import React from 'react'
  import type { InlineMath } from '@yozora/ast'
  import renderInlineMath from '@yozora/html-inline-math'

  const inlineMath: InlineMath = {
    "type": "inlineMath",
    "value": "$x^2 + y^2 = z^2$"
  }
  renderInlineMath(inlineMath)
  // => <span class="yozora-inline-math">$x^2 + y^2 = z^2$</span>
  ```


## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/react-inline-math][]
* [@yozora/react-math][]
* [@yozora/tokenizer-inline-math][]
* [@yozora/tokenizer-math][]
* [mathjax][]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#inline-math
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-inline-math]: https://www.npmjs.com/package/@yozora/tokenizer-inline-math
[@yozora/tokenizer-math]: https://www.npmjs.com/package/@yozora/tokenizer-math
[@yozora/react-inline-math]: https://www.npmjs.com/package/@yozora/react-inline-math
[@yozora/react-math]: https://www.npmjs.com/package/@yozora/react-math
[mathjax]: https://www.mathjax.org/
