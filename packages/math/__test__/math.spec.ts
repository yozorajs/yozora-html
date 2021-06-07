import type { Math } from '@yozora/ast'
import renderMath from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const math: Math = {
      type: 'math',
      value: '$$x^2 + y^2 = z^2$$',
    }
    expect(renderMath(math)).toMatchSnapshot()
  })
})
