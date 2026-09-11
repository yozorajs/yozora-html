import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import { importX } from 'eslint-plugin-import-x'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: [
      '.nx/',
      '.vscode/',
      '**/__tmp__/',
      '**/__test__/cases/',
      '**/coverage/',
      '**/doc/',
      '**/example/',
      '**/lib/',
      '**/node_modules/',
      '**/resources/',
    ],
  },
  eslint.configs.recommended,
  importX.flatConfigs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,ts}'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'import-x/named': 'off',
      'import-x/no-unresolved': 'off',
      'import-x/no-named-as-default': 'off',
      'import-x/no-named-as-default-member': 'off',
      'import-x/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: [['builtin', 'external'], 'internal', 'parent', 'sibling'],
          pathGroups: [{ pattern: '@*/**', group: 'internal', position: 'after' }],
          'newlines-between': 'never',
        },
      ],
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: { project: './tsconfig.test.json' },
    },
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ['**/__test__/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'no-template-curly-in-string': 'off',
    },
  },
  eslintConfigPrettier,
]
