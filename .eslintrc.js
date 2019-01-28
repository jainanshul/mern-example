module.exports = { // eslint-disable-line import/no-commonjs
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
    'mocha': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': 8,
  },
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
  'rules': {
    'import/first': [
      'error',
    ],
    'import/no-commonjs': [
      'error',
    ],
    'import/order': [
      'error',
      {
        'groups': [
          ['internal', 'external', 'builtin'],
          ['index', 'sibling', 'parent']
        ],
        'newlines-between': 'always',
      },
    ],
    'indent': [
      'error',
      2,
      {'MemberExpression': 0},
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'no-console': [
      0
    ],
    'quotes': [
      'error',
      'single', {'avoidEscape': true, 'allowTemplateLiterals': true},
    ],
    'react/prop-types': 0,
    'require-await': [
      'error'
    ],
    'semi': [
      'error',
      'always',
    ],
  },
};
