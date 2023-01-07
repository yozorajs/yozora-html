import { tsMonorepoConfig } from '@guanghechen/jest-config'
import path from 'node:path'
import url from 'node:url'

export default async function () {
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
  const baseConfig = await tsMonorepoConfig(__dirname, { useESM: true })

  const config = {
    ...baseConfig,
    testEnvironment: 'jsdom',
    extensionsToTreatAsEsm: ['.ts', '.mts'],
    moduleNameMapper: {
      ...baseConfig.moduleNameMapper,
      '\\.styl$': path.join(__dirname, 'jest.identity-obj-proxy.js'),
    },
    collectCoverageFrom: [
      '<rootDir>/index.js',
      '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
      '<rootDir>/src/*.{js,jsx,ts,tsx}',
    ],
    coverageThreshold: {
      global: {
        branches: 50,
        functions: 60,
        lines: 90,
        statements: 90,
      },
    },
  }
  return config
}
