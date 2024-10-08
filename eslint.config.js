import ghcConfigs from '@guanghechen/eslint-config'

export default [
  {
    ignores: [
      '**/__tmp__/',
      '**/__test__/cases/',
      '**/doc/',
      '**/example/',
      '**/node_modules/',
      '**/resources/',
    ],
  },
  ...ghcConfigs,
]
