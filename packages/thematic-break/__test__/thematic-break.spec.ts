import type { IThematicBreak } from '@yozora/ast'
import renderThematicBreak from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const thematicBreak: IThematicBreak = { type: 'thematicBreak' }
    expect(renderThematicBreak(thematicBreak)).toMatchSnapshot()
  })
})
