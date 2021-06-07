import type { ThematicBreak } from '@yozora/ast'
import renderThematicBreak from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const thematicBreak: ThematicBreak = { type: 'thematicBreak' }
    expect(renderThematicBreak(thematicBreak)).toMatchSnapshot()
  })
})
