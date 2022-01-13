import type { InlineCode as IInlineCode } from '@yozora/ast'
import renderInlineCode from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node: IInlineCode = {
      type: 'inlineCode',
      value: 'dijkstra',
    }
    expect(renderInlineCode(node)).toMatchSnapshot()
  })
})
