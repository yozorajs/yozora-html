import { TextType } from '@yozora/ast'
import renderText from '../src'

describe('snapshot', function () {
  it('basic', function () {
    renderText({
      type: TextType,
      value: 'literal content.'
    })
  })

  it('empty value', function () {
    renderText({
      type: TextType,
      value: ''
    })
  })
})
