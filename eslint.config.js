import antfu from '@antfu/eslint-config'

export default antfu(
  {
    typescript: true,
    vue: true,
  },
  {
    files: ['apps/server/**/*.{ts,js}'],
    rules: {
      'no-console': 'off', // allow console in server
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
        disallowTypeAnnotations: false,
        fixStyle: 'separate-type-imports',
      }],
    },
  },
  {
    files: ['apps/client/**/*.{ts,vue,js}'],
    rules: {
      'no-console': 'warn', // warn in client
    },
  }
)
