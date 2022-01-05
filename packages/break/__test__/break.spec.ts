import type { IBreak } from '@yozora/ast'
import renderBreak from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node: IBreak = {
      type: 'break',
    }
    expect(renderBreak(node)).toMatchSnapshot()
  })
})
