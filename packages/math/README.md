<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-html/tree/main/packages/math#readme">@yozora/html-math</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/html-math">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/html-math.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-math">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/html-math.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-math">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/html-math.svg"
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
        src="https://img.shields.io/node/v/@yozora/html-math"
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

This component is for rendering the Yozora Markdown AST node [`IMath`][@yozora/ast] 
produced by [@yozora/tokenizer-math][] into HTML string.

This component has been built into [@yozora/html-markdown][], you can use it directly.

## Install

* npm

  ```bash
  npm install --save @yozora/html-math
  ```

* yarn

  ```bash
  yarn add @yozora/html-math
  ```


## Usage

* Basic:

  ```typescript
  import type { IMath } from '@yozora/ast'
  import renderMath from '@yozora/html-math'

  const math: IMath = { "type": "math", "value": "$$x^2 + y^2 = z^2$$" }
  renderMath(math)
  // => <div class="yozora-math">$$x^2 + y^2 = z^2$$</div>
  ```

## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/react-inline-math][]
* [@yozora/react-math][]
* [@yozora/tokenizer-inline-math][]
* [@yozora/tokenizer-math][]
* [mathjax][]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#math
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-inline-math]: https://www.npmjs.com/package/@yozora/tokenizer-inline-math
[@yozora/tokenizer-math]: https://www.npmjs.com/package/@yozora/tokenizer-math
[@yozora/react-inline-math]: https://www.npmjs.com/package/@yozora/react-inline-math
[@yozora/react-math]: https://www.npmjs.com/package/@yozora/react-math
[mdast]: https://github.com/syntax-tree/mdast#math
[mathjax]: https://www.mathjax.org/