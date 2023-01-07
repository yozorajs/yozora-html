import type { Root } from '@yozora/ast'
import { HtmlType } from '@yozora/ast'
import { calcDefinitionMap, calcFootnoteDefinitionMap } from '@yozora/ast-util'
import path from 'node:path'
import url from 'node:url'
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
    assert: { type: 'json' },
  }).then(md => md.default)

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
