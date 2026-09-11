import fs from 'node:fs'
import { isBuiltin } from 'node:module'
import path from 'node:path'
import { rollup } from 'rollup'
import { dts } from 'rollup-plugin-dts'
import { defineConfig } from 'vite'

const manifest = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'))
const dependencies = Object.keys({
  ...manifest.dependencies,
  ...manifest.peerDependencies,
  ...manifest.optionalDependencies,
})
const external = (id: string): boolean =>
  isBuiltin(id) || dependencies.some(name => id === name || id.startsWith(`${name}/`))

export default defineConfig(({ mode }) => ({
  plugins: [
    {
      name: 'declaration-bundle',
      apply: 'build',
      async closeBundle() {
        const bundle = await rollup({
          input: manifest.source,
          external,
          plugins: [dts({ tsconfig: 'tsconfig.lib.json', respectExternal: true })],
        })
        try {
          await bundle.write({ file: manifest.types, format: 'es' })
        } finally {
          await bundle.close()
        }
      },
    },
  ],
  build: {
    outDir: 'lib',
    emptyOutDir: true,
    target: 'esnext',
    minify: false,
    sourcemap: mode === 'development',
    lib: {
      entry: manifest.source,
      formats: ['es', 'cjs'],
      fileName: format => (format === 'es' ? 'esm/index.mjs' : 'cjs/index.cjs'),
    },
    rolldownOptions: {
      external,
      output: { exports: 'named' },
    },
  },
}))
