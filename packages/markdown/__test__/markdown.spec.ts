import type { Root } from '@yozora/ast'
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

const loadYozoraAst = (filepath: string): Root =>
  fs.readJSONSync(resolveFixture(filepath.replace(/(\.json)?$/, '.json')))

describe('snapshot', function () {
  it('basic', function () {
    const ast = loadYozoraAst('basic')
    const definitionMap = calcDefinitionMap(ast)
    const footnoteDefinitionMap = calcFootnoteDefinitionMap(ast)
    expect(
      renderMarkdown(ast, definitionMap, footnoteDefinitionMap, renderMap),
    ).toMatchSnapshot()
  })
})
