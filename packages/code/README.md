<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-html/tree/main/packages/code#readme">@yozora/html-code</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/html-code">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/html-code.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-code">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/html-code.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/html-code">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/html-code.svg"
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
        src="https://img.shields.io/node/v/@yozora/html-code"
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

This component is for rendering the Yozora Markdown AST node [`Code`][@yozora/ast] 
produced by [@yozora/tokenizer-code][] into HTML string.

This component has been built into [@yozora/html-markdown][], you can use it directly.

## Install

* npm

  ```bash
  npm install --save @yozora/html-code
  ```

* yarn

  ```bash
  yarn add @yozora/html-code
  ```


## Usage

* Basic:

  ```typescript
  import type { Code } from '@yozora/ast'
  import renderCode from '@yozora/html-code'

  const code: Code = {
    "type": "code",
    "lang": "",
    "meta": "",
    "value": "multiple\nliteral\ntexts"
  }
  renderCode(code)
  // => <code class=\"yozora-code\"><pre>multiple
  //    literal
  //    texts</pre></code>
  ```

* Highlighted:

  ```typescript
  import type { Code } from '@yozora/ast'
  import renderCode from '@yozora/html-code'

  const code: Code = {
    "type": "code",
    "lang": "javascript",
    "meta": "",
    "value": "const a = 1\nconst b = 2\nconsole.log(\"a + b =\", a + b)\n"
  }
  renderCode(code)
  // => <code class=\"yozora-code\"><pre><span class=\"token keyword\">const</span> a <span class=\"token operator\">=</span> <span class=\"token number\">1</span>
  //    <span class=\"token keyword\">const</span> b <span class=\"token operator\">=</span> <span class=\"token number\">2</span>
  //    console<span class=\"token punctuation\">.</span><span class=\"token function\">log</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"a + b =\"</span><span class=\"token punctuation\">,</span> a <span class=\"token operator\">+</span> b<span class=\"token punctuation\">)</span>
  //    </pre></code>
  ```

## Related

* [@yozora/ast][]
* [@yozora/react-markdown][]
* [@yozora/react-inline-code][]
* [@yozora/react-code][]
* [@yozora/tokenizer-inline-code][]
* [@yozora/tokenizer-code][]


[@yozora/ast]: https://www.npmjs.com/package/@yozora/ast#code
[@yozora/react-markdown]: https://www.npmjs.com/package/@yozora/react-markdown
[@yozora/tokenizer-inline-code]: https://www.npmjs.com/package/@yozora/tokenizer-inline-code
[@yozora/tokenizer-code]: https://www.npmjs.com/package/@yozora/tokenizer-code
[@yozora/react-inline-code]: https://www.npmjs.com/package/@yozora/react-inline-code
[@yozora/react-code]: https://www.npmjs.com/package/@yozora/react-code
[mdast]: https://github.com/syntax-tree/mdast#code