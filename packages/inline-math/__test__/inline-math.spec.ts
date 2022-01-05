import type { IInlineMath } from '@yozora/ast'
import renderInlineMath from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node: IInlineMath = {
      type: 'inlineMath',
      value: '$x^2 + y^2 = z^2$',
    }
    expect(renderInlineMath(node)).toMatchSnapshot()
  })
})
