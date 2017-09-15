// @flow
const path = require('path')
const s2s = require('../../dest')

module.exports = {
  watch: './**/*.js',
  plugins: [
    {
      test: /type.js$/,
      plugin: ['define-undefined-type', { usePrefix: true }],
    },
  ],
  afterHooks: [s2s.hooks.prettier()],
}
