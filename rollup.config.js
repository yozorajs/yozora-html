import createRollupConfigs from '@guanghechen/rollup-config-tsx'
import path from 'path'

export async function rollupConfig() {
  const { default: manifest } = await import(path.resolve('package.json'))

  const paths = {
    assetPath: path.resolve('lib'),
    basePath: path.resolve('src'),
    styleFile: path.resolve('src/style/index.styl'),
    tsconfig: path.resolve('tsconfig.src.json'),
  }

  const configs = createRollupConfigs({
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
  return configs
}

const configs = rollupConfig()
export default configs
