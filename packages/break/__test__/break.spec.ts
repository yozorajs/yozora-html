import type { Break } from '@yozora/ast'
import renderBreak from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node: Break = {
      type: 'break',
    }
    expect(renderBreak(node)).toMatchSnapshot()
  })
})
