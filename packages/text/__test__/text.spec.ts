import type { Text } from '@yozora/ast'
import renderText from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const text: Text = {
      type: 'text',
      value: 'literal content.',
    }
    expect(renderText(text)).toMatchSnapshot()
  })

  it('empty value', function () {
    const text: Text = {
      type: 'text',
      value: '',
    }
    expect(renderText(text)).toMatchSnapshot()
  })
})
