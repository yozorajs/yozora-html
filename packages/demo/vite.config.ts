import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { renderMarkdown } from '@yozora/html-markdown'
import { defineConfig } from 'vite'
import { sampleFootnotes, sampleRoot } from './src/sample.ts'

const shellPath = fileURLToPath(new URL('./src/shell.html', import.meta.url))

export default defineConfig({
  base: './',
  server: { host: '127.0.0.1', port: 7301, strictPort: true },
  preview: { host: '127.0.0.1', port: 7301, strictPort: true },
  plugins: [
    tailwindcss(),
    {
      name: 'yozora-demo-content',
      transformIndexHtml: {
        order: 'pre',
        handler(html) {
          const document = renderMarkdown(sampleRoot, {}, sampleFootnotes, undefined, {
            className: 'demo-markdown',
          })
          const shell = fs
            .readFileSync(shellPath, 'utf8')
            .replace('<!--demo-document-->', () => document)
          return html.replace('<!--demo-shell-->', () => shell)
        },
      },
      configureServer(server) {
        server.watcher.add(shellPath)
        server.watcher.on('change', filename => {
          if (filename === shellPath) server.ws.send({ type: 'full-reload' })
        })
      },
    },
  ],
  build: {
    rolldownOptions: {
      input: {
        tailwind: fileURLToPath(new URL('./index.html', import.meta.url)),
        standalone: fileURLToPath(new URL('./standalone.html', import.meta.url)),
      },
    },
  },
})
