import type { Root } from '@yozora/ast'
import { calcDefinitionMap, calcFootnoteDefinitionMap } from '@yozora/ast-util'
import fs from 'fs-extra'
import path from 'path'
import renderMarkdown from '../src'

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
      renderMarkdown(ast, definitionMap, footnoteDefinitionMap),
    ).toMatchSnapshot()
  })
})
