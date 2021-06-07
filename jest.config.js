const { tsMonorepoConfig } = require('@guanghechen/jest-config')
const path = require('path')

module.exports = {
  ...tsMonorepoConfig(__dirname),
  coveragePathIgnorePatterns: [],
  moduleNameMapper: {
    '\\.(css|less|scss|sass|styl)$': path.resolve(
      __dirname,
      'script/mocks/style.js',
    ),
  },
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 80,
      lines: 60,
      statements: 60,
    },
  },
}
