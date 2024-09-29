import { tsMonorepoConfig } from '@guanghechen/jest-config'
import path from 'node:path'
import url from 'node:url'

export default async function () {
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
  const { default: manifest } = await import(path.resolve('package.json'), {
    assert: { type: 'json' },
  })

  const baseConfig = await tsMonorepoConfig(__dirname, {
    useESM: true,
    tsconfigFilepath: path.join(__dirname, 'tsconfig.test.json'),
  })

  const config = {
    ...baseConfig,
    testEnvironment: 'jsdom',
    extensionsToTreatAsEsm: ['.ts', '.mts'],
    collectCoverageFrom: [
      '<rootDir>/index.js',
      '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
      '<rootDir>/src/*.{js,jsx,ts,tsx}',
    ],
    transformIgnorePatterns: ['<rootDir>/../../node_modules/'],
    coverageThreshold: {
      ...coverageMap[manifest.name],
      global: {
        branches: 50,
        functions: 60,
        lines: 90,
        statements: 90,
        ...coverageMap[manifest.name]?.global,
      },
    },
  }
  return config
}

const coverageMap = {
  '@yozora/html-admonition': {
    global: { branches: 8, lines: 85, statements: 85 },
  },
  '@yozora/html-markdown': {
     global: { functions: 40},
  }
}
