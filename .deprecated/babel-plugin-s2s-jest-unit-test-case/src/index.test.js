// @flow
import path from 'path'
import pluginTester from 'babel-plugin-tester'
import plugin from '.'

const getFixturesPath = x => path.resolve(__dirname, '__fixtures__', x)
const filename = getFixturesPath('test.js')

pluginTester({
  title: 'default',
  plugin,
  snapshot: true,
  babelOptions: { filename },
  pluginOptions: { from: getFixturesPath('export-sum.js') },
  tests: [
    `// empty`,
    {
      title: 'when exist test("sum")',
      code: `
    test('sum', () => {
      expect(sum(1, 1)).toBe(2)
    })
    `,
    },
    {
      title: 'when sum is imported',
      code: `
    import { sum } from './export-sum'
    `,
    },
    {
      title: 'when sum is not imported',
      code: `
    import { add } from './export-sum'
    `,
    },
    {
      title: 'when other source is imported',
      code: `
    import { add } from './other-source'
    `,
    },
  ],
})

pluginTester({
  title: 'multi-exports',
  plugin,
  snapshot: true,
  babelOptions: { filename },
  pluginOptions: { from: getFixturesPath('multi-exports.js') },
  tests: [
    `// empty`,
    {
      title: 'when exist test("sum")',
      code: `
    test('sum', () => {
      expect(sum(1, 1)).toBe(2)
    })
    `,
    },
  ],
})

pluginTester({
  title: 'when sum is not exported',
  plugin,
  snapshot: true,
  babelOptions: { filename },
  pluginOptions: { from: getFixturesPath('no-export-sum.js') },
  tests: [`// empty`],
})

pluginTester({
  plugin,
  babelOptions: { filename },
  tests: [
    {
      title: 'throw error',
      code: `// throw error`,
      error: /required from option/,
    },
  ],
})
