import type { Image as IImage } from '@yozora/ast'
import renderImage from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node: IImage = {
      type: 'image',
      url: 'https://github.com/favicon.svg/',
      alt: 'github favicon',
      title: 'github favicon',
    }
    expect(renderImage(node)).toMatchSnapshot()
  })
})
