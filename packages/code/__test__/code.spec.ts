import type { Code } from '@yozora/ast'
import renderCode from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const code: Code = {
      type: 'code',
      lang: '',
      meta: '',
      value: 'multiple\nliteral\ntexts',
    }
    expect(renderCode(code)).toMatchSnapshot()
  })

  it('javascript', function () {
    const code: Code = {
      type: 'code',
      lang: 'javascript',
      meta: '',
      value: 'const a = 1\nconst b = 2\nconsole.log("a + b =", a + b)\n',
    }
    expect(renderCode(code)).toMatchSnapshot()
  })
})
