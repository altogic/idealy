module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'airbnb', 'next/core-web-vitals', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: '6',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@next/next/no-img-element': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    'jsx-a11y/anchor-is-valid': 'off',
    'import/extensions': 'off',
    'no-underscore-dangle': 'off',
    'no-shadow': 'off',
    'no-nested-ternary': 'off'
  },
  settings: {
    'import/resolver': {
      jsconfig: {
        config: 'jsconfig.json'
      }
    }
  }
};
