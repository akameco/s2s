// @flow
import path from 'path'
import pluginTester from 'babel-plugin-tester'
import plugin from '.'

const getFixturePath = (...x) =>
  path.resolve(__dirname, '..', '__fixtures__', ...x)

function testWithFixture(title, fixture) {
  pluginTester({
    plugin,
    snapshot: true,
    pluginOptions: { from: fixture },
    tests: [
      {
        title,
        fixture,
      },
    ],
  })
}

function pluginTest(tests: $ReadOnlyArray<{ title: string, file: string }>) {
  for (const { title, file } of tests) {
    testWithFixture(title, getFixturePath(file))
  }
}

pluginTest([
  {
    title: 'initialize object when empty object',
    file: 'reducer-empty.js',
  },
  {
    title: 'overwirte property when property is not type match',
    file: 'reducer.js',
  },
  {
    title: 'initialState not found',
    file: 'reducer-no-state.js',
  },
])
