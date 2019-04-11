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

testWithFixture('default', getFixturePath('index.js'))
