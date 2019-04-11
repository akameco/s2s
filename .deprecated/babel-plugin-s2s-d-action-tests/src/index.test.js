// @flow
import path from 'path'
import pluginTester from 'babel-plugin-tester'
import plugin from '.'

const fromPath = path.resolve(__dirname, '__fixtures__', 'actions.js')

pluginTester({
  title: 'default',
  plugin,
  snapshot: true,
  pluginOptions: { from: fromPath },
  tests: [
    `
      // @flow
    `,
    `
      // @flow
      test('a', () => {});
    `,
  ],
})
