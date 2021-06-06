import { TextType } from '@yozora/ast'
import renderText from '../src'

describe('snapshot', function () {
  it('basic', function () {
    expect(
      renderText({
        type: TextType,
        value: 'literal content.',
      }),
    ).toMatchSnapshot()
  })

  it('empty value', function () {
    expect(
      renderText({
        type: TextType,
        value: '',
      }),
    ).toMatchSnapshot()
  })
})
