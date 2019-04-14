// @flow
import path from 'path'

import pluginTester from 'babel-plugin-tester'
import plugin from '.'

const cwd = path.resolve(__dirname, '..')
const filename = path.resolve(cwd, 'src', 'app', 'actionTypes.js')
const output = path.resolve(cwd, 'src', 'types', 'actions.js')

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: { filename, configFile: false },
  pluginOptions: {
    input: 'src/__fixtures__/**/*.js',
    output,
    globOptions: { cwd },
  },
  tests: [
    {
      title: 'options',
      code: `// @flow`,
    },
  ],
})

pluginTester({
  plugin,
  babelOptions: { filename, configFile: false },
  tests: [
    {
      title: 'error',
      code: `// throw error`,
      error: /require input option/,
    },
  ],
})

pluginTester({
  plugin,
  babelOptions: { filename, configFile: false },
  pluginOptions: {
    input: 'src/__fixtures__/**/*.js',
  },
  tests: [
    {
      title: 'error',
      code: `// throw error`,
      error: /require output option/,
    },
  ],
})

pluginTester({
  plugin,
  babelOptions: { filename, configFile: false },
  snapshot: true,
  pluginOptions: {
    input: 'src/**/actionTypes.js',
    output,
    globOptions: { cwd },
  },
  tests: [
    {
      title: 'glob options',
      code: `// show options`,
    },
  ],
})
