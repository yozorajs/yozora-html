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
      commonjsOptions: {
        sourceMap: false,
      },
      typescriptOptions: {
        tsconfig: 'tsconfig.src.json',
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
            declarationMap: false,
            declarationDir: null,
            removeComments: true,
          },
        },
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

  configs.unshift(
    ...createRollupConfigs({
      manifest,
      pluginOptions: {
        commonjsOptions: {
          sourceMap: false,
        },
        typescriptOptions: {
          tsconfig: 'tsconfig.src.json',
          tsconfigOverride: {
            compilerOptions: {
              removeComments: false,
              emitDeclarationOnly: true,
            },
          },
        },
      },
    }),
  )
  return configs
}

const configs = rollupConfig()
export default configs
