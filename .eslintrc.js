module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    'react-intl',
    'jsx-a11y',
    'import',
    'jest',
  ],
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'prettier/standard',
  ],
  env: {
    browser: false,
    es6: true,
    'jest/globals': true,
  },
  globals: {
    "document": true,
    "navigator": true,
    "window":true,
    "node":true
  },
  "settings": {
    "import/resolver": {
      webpack: {
        config: './config/webpack.dev.config.js',
      },
      node: {
        moduleDirectory: ['node_modules', 'app'],
      },
    }
  },
  rules: {
    'no-unused-vars': ['off', { args: 'none' }],
    'no-console': 'off',
    'no-script-url': 'warn',
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'no-alert': 'off',

    'prefer-const': 'off',
    'prefer-destructuring': 'off',
    'prefer-arrow-callback': 'off',

    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',

    'global-require': 'off',
    'consistent-return': 'off',
    'arrow-body-style': 'off',
    'eqeqeq': 'warn',
    'class-methods-use-this': 'off',
    
    'react/button-has-type': 'off',
    'react/jsx-filename-extension': 'off',
    'react/destructuring-assignment': 'off',
    'react/sort-comp': 'off',
    'react/no-danger': 'off',
    'react/require-default-props': 'off',
    'react/no-unknown-property': 'error',
    'react/jsx-key': 'error',
    'react/no-children-prop': 'off',
    'react/prefer-stateless-function': 'warn',
    'react/no-multi-comp': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react/forbid-prop-types': 0,
    'react/no-array-index-key': 0,
    'react/jsx-wrap-multilines': 0,
    'react/no-string-refs': 'error',
    "react/jsx-uses-vars": 1,
    "react/jsx-uses-react": 1,

    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': ['warn', { aspects: ['invalidHref'] }],
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',

    'jest/no-identical-title': 'off',
    'jest/prefer-to-have-length': 'error',
  },
}