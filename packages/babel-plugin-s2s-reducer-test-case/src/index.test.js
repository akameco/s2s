// @flow
import path from 'path'
import pluginTester from 'babel-plugin-tester'
import plugin from '.'

const getFixturesPath = x => path.resolve(__dirname, '__fixtures__', x)
const fromPath = getFixturesPath('reducer.js')
const fromWithStatePath = getFixturesPath('with-initial-state.js')

const testCases = [
  {
    title: 'basic',
    code: `
import reducer, {initialState} from './actions'
    `,
  },
  {
    title: 'exist test case',
    code: `
import reducer, {initialState} from './actions'
import * as actions from './actions'

test('handle INCREMENT', () => {
  expect(actions.sample()).toEqual(null)
})
    `,
  },
]

pluginTester({
  title: 'default',
  plugin,
  snapshot: true,
  babelOptions: { configFile: false },
  pluginOptions: { from: fromPath },
  tests: testCases,
})

pluginTester({
  title: 'with initial state',
  plugin,
  snapshot: true,
  babelOptions: { configFile: false },
  pluginOptions: { from: fromWithStatePath },
  tests: testCases,
})

pluginTester({
  plugin,
  babelOptions: { configFile: false },
  tests: [
    {
      title: 'throw error',
      code: `// throw error`,
      error: /required from option/,
    },
  ],
})
