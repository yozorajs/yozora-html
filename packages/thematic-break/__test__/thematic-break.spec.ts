import { ThematicBreakType } from '@yozora/ast'
import renderThematicBreak from '../src'

describe('snapshot', function () {
  it('basic', function () {
    expect(
      renderThematicBreak({
        type: ThematicBreakType,
      }),
    ).toMatchSnapshot()
  })
})
