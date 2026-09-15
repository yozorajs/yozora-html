import type { Definition } from '@yozora/ast'
import { describe, expect, it } from 'vitest'
import { createNodeRendererContext } from '../src'
import { render, text } from './helper'

describe('link and image renderers', () => {
  it.each([undefined, '', '<b>Title</b>'])('renders links with title %j', title => {
    const expectedTitle = title ? '&lt;b&gt;Title&lt;/b&gt;' : '/target'
    expect(render({ type: 'link', url: '/target', title, children: [text('label')] })).toBe(
      `<a class="yozora-link" href="/target" title="${expectedTitle}" target="_blank" rel="noopener noreferrer"><span class="yozora-text">label</span></a>`,
    )
  })

  it.each([undefined, '', '<b>Title</b>'])('renders images with title %j', title => {
    expect(render({ type: 'image', url: '/image.png', alt: '<b>Alt</b>', title })).toBe(
      `<img class="yozora-image" alt="&lt;b&gt;Alt&lt;/b&gt;" src="/image.png" title="${title ? '&lt;b&gt;Title&lt;/b&gt;' : '&lt;b&gt;Alt&lt;/b&gt;'}" />`,
    )
  })
})

describe('reference renderers', () => {
  it.each(['linkReference', 'imageReference'])('omits unresolved %s', type => {
    expect(
      render({
        type,
        identifier: 'missing',
        label: 'Missing',
        referenceType: 'full',
        children: [text('label')],
        alt: '&lt;b&gt;Alt&lt;/b&gt;',
      }),
    ).toBe('')
  })

  it.each([undefined, '', '<b>Title</b>'])('resolves shared definitions with title %j', title => {
    const definition: Definition = {
      type: 'definition',
      identifier: 'ref',
      label: 'Definition label',
      url: '/target',
      title,
    }
    const context = createNodeRendererContext({ ref: definition }, {})
    const link = {
      type: 'linkReference',
      identifier: 'ref',
      label: 'ref',
      referenceType: 'full',
      children: [text('label')],
    }
    const image = {
      type: 'imageReference',
      identifier: 'ref',
      label: 'ref',
      referenceType: 'full',
      alt: '<b>Accessible description</b>',
    }
    expect(context.renderChildren([link])).toBe(
      `<a class="yozora-link" href="/target" title="${title ? '&lt;b&gt;Title&lt;/b&gt;' : '/target'}" target="_blank" rel="noopener noreferrer"><span class="yozora-text">label</span></a>`,
    )
    expect(context.renderChildren([image])).toBe(
      `<img class="yozora-image" alt="&lt;b&gt;Accessible description&lt;/b&gt;" src="/target" title="${title ? '&lt;b&gt;Title&lt;/b&gt;' : '&lt;b&gt;Accessible description&lt;/b&gt;'}" />`,
    )
  })

  it('keeps different alternative text for images sharing one definition', () => {
    const definition: Definition = {
      type: 'definition',
      identifier: 'shared',
      label: 'Definition label',
      url: '/shared.png',
    }
    const context = createNodeRendererContext({ shared: definition }, {})
    for (const alt of ['First image', 'Second image', '']) {
      const node = {
        type: 'imageReference',
        identifier: 'shared',
        label: 'shared',
        referenceType: 'full',
        alt,
      }
      expect(context.renderChildren([node])).toBe(
        `<img class="yozora-image" alt="${alt}" src="/shared.png" title="${alt}" />`,
      )
    }
  })
})
