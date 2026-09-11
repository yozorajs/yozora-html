import type { FootnoteDefinition, Root } from '@yozora/ast'
import { HtmlType } from '@yozora/ast'
import { calcDefinitionMap, calcFootnoteDefinitionMap } from '@yozora/ast-util'
import path from 'node:path'
import url from 'node:url'
import { describe, expect, test } from 'vitest'
import type { INodeRendererMap } from '../src'
import { defaultRendererMap, renderMarkdown } from '../src'

const rendererMap: INodeRendererMap = {
  ...defaultRendererMap,
  [HtmlType]: () => '',
}

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const resolveFixture = (...p: string[]): string => path.join(__dirname, 'fixtures', ...p)

const loadYozoraAst = (filepath: string): Promise<Root> =>
  import(resolveFixture(filepath.replace(/(\.json)?$/, '.json')), {
    with: { type: 'json' },
  }).then(md => md.default)

test('renders extensions and footnotes through the workspace renderers', () => {
  const footnoteContent = {
    type: 'paragraph',
    children: [{ type: 'text', value: 'Footnote content' }],
  }
  const footnote: FootnoteDefinition = {
    type: 'footnoteDefinition',
    identifier: 'note',
    label: '1',
    children: [footnoteContent],
  }
  const children = [
    { type: 'admonition', keyword: 'note', title: [], children: [] },
    { type: 'math', value: '<script>alert(1)</script>x + y' },
    { type: 'inlineMath', value: 'x' },
    { type: 'footnoteReference', identifier: 'note', label: '1' },
    footnote,
    { type: 'footnote', children: [] },
    { type: 'ecmaImport', value: 'ignored import' },
  ]
  const root: Root = { type: 'root', children }
  const html = renderMarkdown(root, {}, { note: footnote })
  expect(html).toContain('yozora-admonition--note')
  expect(html).toContain('<div class="yozora-math">x + y</div>')
  expect(html).toContain('<span class="yozora-inline-math">x</span>')
  expect(html).toContain('<a href="#note" title="1">[1]</a>')
  expect(html).toContain('Footnote content')
  expect(html).not.toContain('<script>')
  expect(html).not.toContain('ignored import')
})

describe('snapshot', function () {
  test('basic', async function () {
    const ast0 = await loadYozoraAst('basic')
    const { root: ast1, definitionMap } = calcDefinitionMap(ast0)
    const { root, footnoteDefinitionMap } = calcFootnoteDefinitionMap(ast1)
    expect(
      renderMarkdown(root, definitionMap, footnoteDefinitionMap, rendererMap),
    ).toMatchSnapshot()
  })
})
