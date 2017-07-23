// @flow
const path = require('path')
const s2s = require('../../dest/index')

const templateDir = path.resolve(__dirname, 'templates')
const setInput = p => path.join(templateDir, p)

module.exports = {
  watch: './**/*.js',
  plugins: [
    {
      test: /actionTypes.js$/,
      output: 'actions.js',
      plugin: ['create-redux-action-func', { actionTypes: 'actionTypes.js' }],
    },
  ],
  templates: [
    { test: /reducer.js/, input: setInput('reducer.js') },
    { test: /reducer.test.js/, input: setInput('reducer.test.js') },
  ],
  afterHooks: [
    s2s.hooks.prettier({
      semi: false,
      singleQuote: true,
      trailingComma: 'es5',
    }),
  ],
}
