// @flow
import path from 'path'
import pluginTester from 'babel-plugin-tester'
import plugin from '.'

const getFixturesPath = x => path.resolve(__dirname, '__fixtures__', x)
const fromPath = getFixturesPath('actionTypes.js')
const noopPath = getFixturesPath('noop.js')
const withParamsPath = getFixturesPath('sameParam.js')

pluginTester({
  title: 'default',
  plugin,
  snapshot: true,
  babelOptions: { configFile: false },
  pluginOptions: { from: fromPath },
  tests: [
    {
      title: 'basic',
      code: `
export default function(state: State = initialState, action) {
  switch (action.type) {
    case Actions.INCREMENT:
      return { ...state, count: state + 1 }

    default:
      return state
  }
}
      `,
    },
    {
      title: 'not Actions',
      code: `
export default function(state: State = initialState, action) {
  switch (action.type) {
    case Other.INCREMENT:
      return { ...state, count: state + 1 }
    case Actions.INCREMENT:
      return { ...state, count: state + 1 }
    default:
      return state
  }
}
      `,
    },
    {
      title: 'basic2',
      code: `
function update(state: State = initialState, action) {
  switch (action.type) {
    case Actions.INCREMENT:
      return { ...state, count: state + 1 }
    default:
      return state
  }
}

export default function(state: State = initialState, action) {
  switch (action.type) {
    case Actions.INCREMENT:
      return update(state, action)
    default:
      return state
  }
}
      `,
    },
  ],
})

pluginTester({
  title: 'when actionTypes.js is empty',
  plugin,
  snapshot: true,
  babelOptions: { configFile: false },
  pluginOptions: { from: noopPath },
  tests: [
    `
export default function(state: State = initialState, action) {
  switch (action.type) {
    case Actions.INCREMENT:
      return { ...state, count: state + 1 }

    default:
      return state
  }
}
      `,
  ],
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

pluginTester({
  title: 'when has same property',
  plugin,
  snapshot: true,
  babelOptions: { configFile: false },
  pluginOptions: { from: withParamsPath },
  tests: [
    `
export default function(state: State = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
      `,
  ],
})
