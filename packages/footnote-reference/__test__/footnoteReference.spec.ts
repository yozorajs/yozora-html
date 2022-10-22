import type { FootnoteReference as IFootnoteReference } from '@yozora/ast'
import renderFootnoteReference from '../src'

describe('snapshot', function () {
  it('basic', function () {
    const node = {
      type: 'footnoteReference',
      identifier: 'bravo',
      label: 'bravo',
    }
    expect(renderFootnoteReference(node as IFootnoteReference)).toMatchSnapshot()
  })

  it('basic-2', function () {
    const node = {
      type: 'footnoteReference',
      identifier: 'bravo"',
      label: 'bravo<a>"<b:"></sup>',
    }
    expect(renderFootnoteReference(node as IFootnoteReference)).toMatchSnapshot()
  })
})
