import type { IRoot } from '@yozora/ast'
import { HtmlType } from '@yozora/ast'
import { calcDefinitionMap, calcFootnoteDefinitionMap } from '@yozora/ast-util'
import fs from 'fs-extra'
import path from 'path'
import type { YastNodeRendererMap } from '../src'
import renderMarkdown, { defaultRendererMap } from '../src'

const renderMap: YastNodeRendererMap = {
  ...defaultRendererMap,
  [HtmlType]: () => '',
}

const resolveFixture = (...p: string[]): string =>
  path.join(__dirname, 'fixtures', ...p)

const loadYozoraAst = (filepath: string): IRoot =>
  fs.readJSONSync(resolveFixture(filepath.replace(/(\.json)?$/, '.json')))

describe('snapshot', function () {
  it('basic', function () {
    const ast0 = loadYozoraAst('basic')
    const { root: ast1, definitionMap } = calcDefinitionMap(ast0)
    const { root, footnoteDefinitionMap } = calcFootnoteDefinitionMap(ast1)
    expect(
      renderMarkdown(root, definitionMap, footnoteDefinitionMap, renderMap),
    ).toMatchSnapshot()
  })
})
