import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const workspaceRoot = path.dirname(fileURLToPath(import.meta.url))
const packageName = path.basename(process.cwd())

export default defineConfig({
  resolve: {
    alias: {
      'vitest.setup': path.join(workspaceRoot, 'vitest.setup.ts'),
      '@yozora/core-html-renderer': path.join(
        workspaceRoot,
        'packages/core-html-renderer/src/index.ts',
      ),
      '@yozora/html-admonition': path.join(workspaceRoot, 'packages/html-admonition/src/index.ts'),
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
        branches: packageName === 'html-admonition' ? 8 : 50,
        functions: packageName === 'html-markdown' ? 40 : 60,
        lines: packageName === 'html-admonition' ? 85 : 90,
        statements: packageName === 'html-admonition' ? 85 : 90,
      },
    },
  },
})
