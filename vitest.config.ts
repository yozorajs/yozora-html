import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const workspaceRoot = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      'vitest.setup': path.join(workspaceRoot, 'vitest.setup.ts'),
      '@yozora/html-markdown': path.join(workspaceRoot, 'packages/html-markdown/src/index.ts'),
    },
  },
  test: {
    environment: 'node',
    include: ['__test__/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
  },
})
