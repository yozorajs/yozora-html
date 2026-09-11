import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const workspaceRoot = fileURLToPath(new URL('../', import.meta.url))
const require = createRequire(import.meta.url)
const declarations = []

for (const entry of fs.readdirSync(path.join(workspaceRoot, 'packages'))) {
  const directory = path.join(workspaceRoot, 'packages', entry)
  const manifest = JSON.parse(fs.readFileSync(path.join(directory, 'package.json'), 'utf8'))
  const esm = await import(pathToFileURL(path.join(directory, manifest.exports.import)).href)
  const cjs = require(path.join(directory, manifest.exports.require))
  assert.deepEqual(Object.keys(esm).sort(), Object.keys(cjs).sort(), manifest.name)
  assert.ok(fs.statSync(path.join(directory, manifest.exports.types)).size > 0, manifest.name)
  declarations.push(path.join(directory, manifest.exports.types))

  if (manifest.name === '@yozora/html-markdown') {
    const root = {
      type: 'root',
      children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Build verification' }] }],
    }
    const html = esm.renderMarkdown(root, {}, {})
    assert.equal(cjs.renderMarkdown(root, {}, {}), html)
    assert.ok(html.includes('<span class="yozora-text">Build verification</span>'))
    assert.equal(esm.default, esm.renderMarkdown)
    assert.equal(cjs.default, cjs.renderMarkdown)
  }
  console.log(`Verified ESM, CJS and declarations: ${manifest.name}`)
}

execFileSync(
  process.execPath,
  [
    require.resolve('typescript/bin/tsc'),
    '--ignoreConfig',
    '--noEmit',
    '--strict',
    '--module',
    'nodenext',
    '--target',
    'esnext',
    ...declarations,
  ],
  { cwd: workspaceRoot, stdio: 'inherit' },
)
