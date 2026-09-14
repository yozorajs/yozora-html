import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { parseArgs } from 'node:util'

const workspaceRoot = fileURLToPath(new URL('../', import.meta.url))
const require = createRequire(import.meta.url)
const typescriptManifestPath = require.resolve('typescript/package.json')
const typescriptManifest = JSON.parse(fs.readFileSync(typescriptManifestPath, 'utf8'))
const tsc = path.resolve(path.dirname(typescriptManifestPath), typescriptManifest.bin.tsc)
const { values } = parseArgs({
  options: { sourcemap: { type: 'boolean' } },
  allowNegative: true,
})

for (const entry of fs.readdirSync(path.join(workspaceRoot, 'packages'), { withFileTypes: true })) {
  if (!entry.isDirectory()) continue
  const directory = path.join(workspaceRoot, 'packages', entry.name)
  const manifestPath = path.join(directory, 'package.json')
  if (!fs.statSync(manifestPath, { throwIfNoEntry: false })) continue
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  if (manifest.private) continue
  const outputDirectory = path.join(directory, 'lib')
  const entrypoints = manifest.exports['.'] ?? manifest.exports
  const stylesheets = Object.entries(manifest.exports).filter(([key]) => key.endsWith('.css'))

  if (values.sourcemap !== undefined) {
    const expectedFiles = Array.from(
      new Set([...Object.values(entrypoints), ...stylesheets.map(([, file]) => file)]),
      file => path.relative(outputDirectory, path.join(directory, file)),
    )
    for (const file of [entrypoints.import, entrypoints.require]) {
      const filename = path.join(directory, file)
      const content = fs.readFileSync(filename, 'utf8')
      assert.equal(content.includes('sourceMappingURL='), values.sourcemap, filename)
      if (values.sourcemap) {
        expectedFiles.push(path.relative(outputDirectory, `${filename}.map`))
        const map = JSON.parse(fs.readFileSync(`${filename}.map`, 'utf8'))
        assert.equal(map.version, 3, filename)
        assert.ok(map.sources.length > 0 && map.mappings.length > 0, filename)
      }
    }
    const outputFiles = fs
      .readdirSync(outputDirectory, { recursive: true })
      .filter(file => fs.statSync(path.join(outputDirectory, file)).isFile())
    assert.deepEqual(outputFiles.sort(), expectedFiles.sort(), `${manifest.name}: output files`)
  }

  const consumerDirectory = fs.mkdtempSync(path.join(outputDirectory, '.consumer-'))
  try {
    const runtimeConsumer = path.join(consumerDirectory, 'index.mjs')
    fs.writeFileSync(
      runtimeConsumer,
      `import * as api from '${manifest.name}'\nexport default api\n` +
        'export const resolve = specifier => import.meta.resolve(specifier)\n',
    )
    const { default: esm, resolve } = await import(pathToFileURL(runtimeConsumer).href)
    const consumerRequire = createRequire(path.join(directory, 'package.json'))
    const cjs = consumerRequire(manifest.name)
    const exportedNames = Object.keys(esm).sort()
    assert.ok(exportedNames.length > 0, `${manifest.name}: missing exports`)
    assert.deepEqual(exportedNames, Object.keys(cjs).sort(), manifest.name)
    assert.ok(fs.statSync(path.join(directory, entrypoints.types)).size > 0, manifest.name)
    for (const [subpath, file] of stylesheets) {
      const specifier = `${manifest.name}${subpath.slice(1)}`
      const filename = path.join(directory, file)
      assert.equal(consumerRequire.resolve(specifier), filename, specifier)
      assert.equal(resolve(specifier), pathToFileURL(filename).href, specifier)
      assert.ok(fs.statSync(filename).size > 0, specifier)
    }

    const consumers = ['mts', 'cts'].map(extension => {
      const filename = path.join(consumerDirectory, `index.${extension}`)
      fs.writeFileSync(filename, `export { ${exportedNames.join(', ')} } from '${manifest.name}'\n`)
      return filename
    })
    execFileSync(
      process.execPath,
      [
        tsc,
        '--ignoreConfig',
        '--noEmit',
        '--strict',
        '--module',
        'nodenext',
        '--target',
        'esnext',
        ...consumers,
      ],
      { cwd: workspaceRoot, stdio: 'inherit' },
    )

    if (manifest.name === '@yozora/html-markdown') {
      const root = {
        type: 'root',
        children: [
          { type: 'paragraph', children: [{ type: 'text', value: 'Build verification' }] },
        ],
      }
      const html = esm.renderMarkdown(root, {}, {})
      assert.equal(cjs.renderMarkdown(root, {}, {}), html)
      assert.ok(html.includes('<span class="yozora-text">Build verification</span>'))
      assert.equal(esm.default, esm.renderMarkdown)
      assert.equal(cjs.default, cjs.renderMarkdown)
      for (const api of [esm, cjs]) {
        assert.equal(api.createNodesRendererContext, api.createNodeRendererContext)
        const context = api.createNodeRendererContext({}, {})
        assert.equal(
          context.renderChildren([{ type: 'inlineMath', value: '<x>' }]),
          '<span class="yozora-inline-math">&lt;x&gt;</span>',
        )
        assert.equal(
          api.renderText({ type: 'text', value: '<x>' }, context),
          '<span class="yozora-text">&lt;x&gt;</span>',
        )
        assert.equal(api.escapeAttribute('"&'), '&quot;&amp;')
        const codeHtml = context.renderChildren([
          { type: 'code', lang: 'ts', value: 'const count: number = 1;' },
        ])
        assert.ok(codeHtml.includes('<span class="token builtin">number</span>'))
        assert.ok(codeHtml.includes('class="yozora-code__line-numbers" aria-hidden="true"'))
        const admonition = {
          type: 'admonition',
          keyword: 'note',
          title: [{ type: 'text', value: '<title>' }],
          children: [],
        }
        const admonitionHtml = api.renderAdmonition(admonition, {
          sanitize: context.sanitize,
          renderChildren: context.renderChildren,
        })
        assert.equal(api.defaultRendererMap.admonition, api.renderAdmonition)
        assert.equal(context.renderChildren([admonition]), admonitionHtml)
        assert.ok(admonitionHtml.includes('yozora-admonition--note'))
        assert.ok(admonitionHtml.includes('<span class="yozora-text">&lt;title&gt;</span>'))
        assert.ok(admonitionHtml.includes('<svg '))
      }
      const options = { className: 'mx-auto [&_h2]:text-sm' }
      const customized = esm.renderMarkdown(root, {}, {}, undefined, options)
      assert.equal(cjs.renderMarkdown(root, {}, {}, undefined, options), customized)
      assert.ok(
        customized.startsWith('<section class="yozora-markdown mx-auto [&amp;_h2]:text-sm">'),
      )
      for (const [source, output] of [
        ['style.css', 'index.css'],
        ['tailwind.css', 'tailwind.css'],
      ]) {
        assert.equal(
          fs.readFileSync(path.join(outputDirectory, output), 'utf8'),
          fs.readFileSync(path.join(directory, 'src', source), 'utf8'),
          `${manifest.name}: ${output}`,
        )
      }
    }
    console.log(`Verified ESM, CJS, declarations and CSS exports: ${manifest.name}`)
  } finally {
    fs.rmSync(consumerDirectory, { recursive: true, force: true })
  }
}
