module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'backslash_back/tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'functional', 'prettier', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:functional/external-typescript-recommended',
    'plugin:functional/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  root: true,
  env: {
    node: true
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-for-in-array': 'warn',
    '@typescript-eslint/member-ordering': ['error'],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    semi: ['warn', 'never'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'max-line-length': ['off'],
    'object-shorthand': 'off',
    'require-await': 'error',
    'no-eval': 'error',
    'use-isnan': ['warn'],
    'no-trailing-spaces': 'error',
    'prettier/prettier': 'error',
    'functional/no-conditional-statement': false | 'ifExhaustive',
    'functional/prefer-readonly-type': 'off',
    'functional/prefer-immutable-types': 'off',
    'functional/immutable-data': 'off',
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    'functional/functional-parameters': 'off',
    'functional/no-expression-statement': 'off',
    'functional/no-return-void': 'off',
    'functional/no-try-statement': 'off',
    'functional/no-expression-statements': 'off',
    'functional/no-conditional-statements': 'off',
    'functional/no-let': 'off',
    'functional/no-mixed-types': 'off',
    'functional/no-loop-statements': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-extra-boolean-cast': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'functional/no-throw-statements': 'off',
    'no-fallthrough': 'off',
    'no-case-declarations': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn', // or "error"
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }
    ]
  },
  overrides: [
    {
      files: ['src/db/entities/*.ts', 'src/db/**/*.ts'],
      rules: {
        'functional/no-classes': 'off'
      }
    }
  ]
}
