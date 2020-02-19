const { join } = require('path')

module.exports = {
  extends: ['airbnb', '../../.eslintrc.js', 'prettier/react', 'plugin:jest/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    'jest/globals': true,
  },
  plugins: ['jest', 'react'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      // Use package.json from both this package folder and root.
      { packageDir: [__dirname, join(__dirname, '../../')] }
    ],
    'react/prop-types': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
}
