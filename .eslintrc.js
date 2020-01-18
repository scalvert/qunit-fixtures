module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  plugins: ['prettier', '@typescript-eslint'],
  extends: ['eslint:recommended', 'prettier', 'prettier/@typescript-eslint'],
  env: {
    browser: false,
    node: true,
    es6: true,
    qunit: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-global-assign': ['error', { exceptions: ['console'] }],
  },
  overrides: [
    // node files
    {
      files: ['.eslintrc.js', '.prettierrc.js', 'index.js'],
      excludedFiles: [],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015,
      },
      env: {
        browser: false,
        node: true,
        es6: true,
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        'node/no-unpublished-require': 'off',
      }),
    },
    {
      files: ['**/src/tests/**/*.ts'],
      parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
      },
      env: {
        qunit: true,
        node: true,
      },
    },
  ],
};
