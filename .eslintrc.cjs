module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-console': 'warn',
    'import/prefer-default-export': 'off',
    'arrow-body-style': 'off',
  },
  ignorePatterns: [
    'dist',
    'node_modules',
    '*.config.js',
    '*.config.cjs',
    'vite.config.ts',
  ],
};
