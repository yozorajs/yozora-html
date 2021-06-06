import type { Break } from '@yozora/ast'
import { BreakType } from '@yozora/ast'
import renderBreak from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node: Break = {
      type: BreakType,
    }
    expect(renderBreak(node)).toMatchSnapshot()
  })
})
