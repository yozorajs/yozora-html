import type { Code as ICode } from '@yozora/ast'
import renderCode from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const code: ICode = {
      type: 'code',
      lang: '',
      meta: '',
      value: 'multiple\nliteral\ntexts',
    }
    expect(renderCode(code)).toMatchSnapshot()
  })

  it('javascript', function () {
    const code: ICode = {
      type: 'code',
      lang: 'javascript',
      meta: '',
      value: 'const a = 1\nconst b = 2\nconsole.log("a + b =", a + b)\n',
    }
    expect(renderCode(code)).toMatchSnapshot()
  })
})
