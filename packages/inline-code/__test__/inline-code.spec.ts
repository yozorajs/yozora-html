import type { InlineCode } from '@yozora/ast'
import renderInlineCode from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node: InlineCode = {
      type: 'inlineCode',
      value: 'dijkstra',
    }
    expect(renderInlineCode(node)).toMatchSnapshot()
  })
})
