import fs from 'node:fs'
import { isBuiltin } from 'node:module'
import path from 'node:path'
import { defineConfig } from 'tsdown'

const manifest = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'))
const dependencies = Object.keys({
  ...manifest.dependencies,
  ...manifest.peerDependencies,
  ...manifest.optionalDependencies,
})
const neverBundle = id =>
  isBuiltin(id) || dependencies.some(name => id === name || id.startsWith(`${name}/`))

const common = {
  cwd: process.cwd(),
  entry: { index: manifest.source },
  tsconfig: 'tsconfig.lib.json',
  target: 'esnext',
  platform: 'neutral',
  deps: { neverBundle, onlyBundle: [] },
  clean: ['lib'],
  exports: false,
  minify: false,
}

export default defineConfig([
  ...[
    ['esm', manifest.module],
    ['cjs', manifest.main],
  ].map(([format, file]) => ({
    ...common,
    format,
    outDir: path.dirname(file),
    outExtensions: () => ({ js: path.extname(file) }),
    cjsDefault: false,
    dts: false,
    outputOptions: { exports: 'named' },
  })),
  {
    ...common,
    format: 'esm',
    outDir: path.dirname(manifest.types),
    outExtensions: () => ({ dts: '.d.ts' }),
    // Keep declaration maps disabled when the CLI enables JavaScript source maps.
    outputOptions: { sourcemap: false },
    // Keep non-exported helper types private in bundled declarations.
    footer: { dts: 'export {};' },
    dts: {
      generator: 'tsc',
      emitDtsOnly: true,
      sourcemap: false,
      compilerOptions: { declarationMap: false },
    },
  },
])
