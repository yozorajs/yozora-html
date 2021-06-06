import { InlineCodeType } from '@yozora/ast'
import renderInlineCode from '../src'

describe('snapshot', function () {
  it('basic', function () {
    expect(
      renderInlineCode({
        type: InlineCodeType,
        value: 'dijkstra'
      }),
    ).toMatchSnapshot()
  })
})
