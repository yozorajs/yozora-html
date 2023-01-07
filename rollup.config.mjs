import createRollupConfigs from '@guanghechen/rollup-config-tsx'
import path from 'node:path'

const paths = {
  basePath: path.resolve('src'),
}

export default async function rollupConfig() {
  const { default: manifest } = await import(
    path.resolve('package.json'),
    { assert: { type: 'json' } },
  )

  const config = await createRollupConfigs({
    manifest,
    pluginOptions: {
      typescriptOptions: {
        tsconfig: 'tsconfig.src.json',
      },
      postcssOptions: {
        extract: 'index.css',
        minimize: false,
        sourceMap: false,
        modules: false,
        postcssUrlOptions: {
          url: 'inline',
          maxSize: 0.5, // 0.5 KB
          basePath: paths.basePath,
          fallback: function (asset) {
            const url = asset.url.replace(/^[/]assets[/]/, '../assets/')
            return url
          },
        },
      },
    },
  })
  return config
}
