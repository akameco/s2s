const path = require('path')
const actionConstants = require('babel-plugin-s2s-d-action-constants').default
const actionTypes = require('babel-plugin-s2s-d-action-types').default
const actionCreater = require('babel-plugin-s2s-d-action-creater').default
const actionTest = require('babel-plugin-s2s-d-action-test').default

const actionTypesMatch = /actions\/.*\/types.js/

module.exports = {
  plugins: [
    {
      test: actionTypesMatch,
      plugin: [actionTypes],
    },
    {
      test: actionTypesMatch,
      output: 'constants.js',
      plugin: [actionConstants],
    },
    {
      test: actionTypesMatch,
      output: 'actions.js',
      plugin: [actionCreater],
    },
    {
      test: actionTypesMatch,
      input: 'actions.test.js',
      output: 'actions.test.js',
      plugin: [actionTest],
    },
  ],
}
