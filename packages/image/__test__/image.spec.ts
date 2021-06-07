import type { Image } from '@yozora/ast'
import renderImage from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node: Image = {
      type: 'image',
      url: 'https://github.com/favicon.svg/',
      alt: 'github favicon',
      title: 'github favicon',
    }
    expect(renderImage(node)).toMatchSnapshot()
  })
})
