import type { InlineMath } from '@yozora/ast'
import renderInlineMath from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node: InlineMath = {
      type: 'inlineMath',
      value: '$x^2 + y^2 = z^2$',
    }
    expect(renderInlineMath(node)).toMatchSnapshot()
  })
})
