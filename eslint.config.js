import antfu from '@antfu/eslint-config'

export default antfu(
  {
    typescript: true,
    vue: true,
  },
  {
    files: ['apps/server/**/*.ts'],
    rules: {
      'no-console': 'off',
      'ts/consistent-type-imports': 'off',
    },
  },
  {
    files: ['apps/client/**/*.{ts,vue,js}'],
    rules: {
      'no-console': 'warn', // warn in client
    },
  },
)
