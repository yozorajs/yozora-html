import type { Math as IMath } from '@yozora/ast'
import renderMath from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const math: IMath = {
      type: 'math',
      value: '$$x^2 + y^2 = z^2$$',
    }
    expect(renderMath(math)).toMatchSnapshot()
  })
})
