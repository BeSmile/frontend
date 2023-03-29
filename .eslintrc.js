module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['react-hooks', 'unused-imports', '@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      tsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  globals: {
    Route: 'readonly',
    MODELS_PATH: 'readonly',
    P5: 'readonly',
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    semi: 2,
    quotes: [1, 'single'],
    'comma-dangle': 0,
    'react/jsx-uses-vars': 1,
    'react/display-name': 1,
    'import-notation': 0,
    '@typescript-eslint/ban-ts-comment': 'off',
    // 'no-unused-vars': ['error', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }],
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-console': 1,
    'no-unused-vars': 'off',

    'no-unexpected-multiline': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'unused-imports/no-unused-imports': 'error',

    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};
