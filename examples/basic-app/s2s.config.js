// @flow
const path = require('path')
const s2s = require('../../dest/index')

module.exports = {
  watch: './**/*.js',
  plugins: [
    {
      test: /actionTypes.js$/,
      output: 'actions.js',
      plugin: ['create-redux-action-func', { actionTypes: 'actionTypes.js' }]
    }
  ],
  templatesDir: 'config/templates',
  templates: [
    { test: /reducer.js/, input: 'reducer.js' },
    { test: /reducer.test.js/, input: 'reducer.test.js' }
  ],
  afterHooks: [s2s.hooks.prettier()]
}
