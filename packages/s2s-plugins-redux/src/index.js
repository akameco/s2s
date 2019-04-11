// @flow
import path from 'path'

import actionTypesPlugin from 'babel-plugin-s2s-action-types'
import actionCreaterPlugin from 'babel-plugin-s2s-action-creater'
import reducerCaseCreaterPlugin from 'babel-plugin-s2s-reducer-case-creater'
import actionRootPlugin from 'babel-plugin-s2s-action-root'
import reducerTestCasePlugin from 'babel-plugin-s2s-reducer-test-case'
import stateRootPlugin from 'babel-plugin-s2s-state-root'
import reducerRootPlugin from 'babel-plugin-s2s-reducer-root'

const cwd = process.cwd()

const getRootDir = (...x) => path.resolve(cwd, 'src', ...x)
const getTyepDir = x => getRootDir('types', x)

const rootReducerPath = getRootDir('reducer.js')
const rootActionPath = getTyepDir('action.js')
const rootStatePath = getTyepDir('state.js')

const plugins = [
  {
    test: /actionTypes.js$/,
    plugin: [actionTypesPlugin, { removePrefix: 'src/containers' }],
  },
  {
    test: /actionTypes.js$/,
    output: 'actions.js',
    plugin: [actionCreaterPlugin],
  },
  {
    test: /actionTypes.js$/,
    input: 'reducer.js',
    output: 'reducer.js',
    plugin: [reducerCaseCreaterPlugin],
  },
  {
    test: /actionTypes.js$/,
    input: rootActionPath,
    output: rootActionPath,
    plugin: [
      actionRootPlugin,
      { input: 'src/**/actionTypes.js', output: rootActionPath },
    ],
  },
  {
    test: /containers\/.+reducer.js/,
    input: 'reducer.test.js',
    output: 'reducer.test.js',
    plugin: [reducerTestCasePlugin],
  },
  {
    test: /containers\/.+reducer.js/,
    input: rootStatePath,
    output: rootStatePath,
    plugin: [
      stateRootPlugin,
      { input: 'src/containers/**/reducer.js', output: rootStatePath },
    ],
  },
  {
    test: /containers\/.+reducer.js/,
    input: rootReducerPath,
    output: rootReducerPath,
    plugin: [
      reducerRootPlugin,
      { input: 'src/containers/**/reducer.js', output: rootReducerPath },
    ],
  },
]

module.exports = plugins
exports.plugins = plugins
