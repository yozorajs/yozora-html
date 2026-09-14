import fs from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { compile } from 'tailwindcss'
import { describe, expect, it } from 'vitest'

async function compileConsumer(prefix: string, theme: string): Promise<string> {
  const compiler = await compile(
    `@import 'tailwindcss/index.css'${prefix ? ` prefix(${prefix})` : ''};
     @import '@yozora/html-markdown/tailwind.css';
     @theme { ${theme} }`,
    {
      base: fileURLToPath(new URL('../', import.meta.url)),
      async loadStylesheet(id, base) {
        const filename = createRequire(path.join(base, 'package.json')).resolve(id)
        return {
          path: filename,
          base: path.dirname(filename),
          content: await fs.readFile(filename, 'utf8'),
        }
      },
    },
  )
  return compiler.build([])
}

describe('published Tailwind CSS entry', () => {
  it.each(['', 'tw', 'app'])('preserves host theme variables with prefix "%s"', async prefix => {
    const css = await compileConsumer(
      prefix,
      '--font-sans: HostSans; --font-mono: HostMono; --spacing: 0.5rem; --color-blue-600: #123456;',
    )
    const namespace = prefix ? `${prefix}-` : ''
    expect(css).toContain(`--${namespace}font-sans: HostSans;`)
    expect(css).toContain(`--${namespace}font-mono: HostMono;`)
    expect(css).toContain(`--${namespace}color-blue-600: #123456;`)
    expect(css).toContain(
      `--yozora__font-family: var(--${namespace}font-sans, ui-sans-serif, system-ui, sans-serif);`,
    )
    expect(css).toContain(
      `--yozora__code-font-family: var(--${namespace}font-mono, ui-monospace, monospace);`,
    )
    expect(css).toContain(`--yozora__link-color: var(--${namespace}color-blue-600, #2563eb);`)
    expect(css).toContain(
      `--yozora__margin-block-node: 0 0 calc(var(--${namespace}spacing, 0.25rem) * 5);`,
    )
    expect(css).not.toContain('--theme(')
  })

  it('retains usable fallbacks when the host removes default theme tokens', async () => {
    const css = await compileConsumer(
      'tw',
      '--color-*: initial; --font-sans: initial; --font-mono: initial; --spacing: initial;',
    )
    expect(css).toContain('--yozora__font-family: ui-sans-serif, system-ui, sans-serif;')
    expect(css).toContain('--yozora__code-font-family: ui-monospace, monospace;')
    expect(css).toContain('--yozora__link-color: #2563eb;')
    expect(css).toContain('--yozora__margin-block-node: 0 0 calc(0.25rem * 5);')
    expect(css).not.toContain('--theme(')
  })
})
