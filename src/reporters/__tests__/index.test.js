// @flow
import chalk from 'chalk'
import stripAnsi from 'strip-ansi'

jest.resetModules()
jest.doMock('chalk', () => new chalk.constructor({ enabled: true }))

// eslint-disable-next-line
import { formatText, trimAndFormatPath } from '../'

test('trimAndFormatPath', () => {
  expect(trimAndFormatPath('/src/user/hoge/index.js')).toMatchSnapshot()
})

test('formatText when handlerType = s2s', () => {
  const inputPath = 'src/input/input.js'
  const outputPath = 'src/output/output.js'
  const result = formatText('S2S', inputPath, outputPath)
  expect(result).toMatchSnapshot()
  expect(stripAnsi(result)).toMatchSnapshot()
})

test('formatText when handlerType = template', () => {
  const inputPath = 'src/input/input.js'
  const outputPath = 'src/output/output.js'
  const result = formatText('TEMPLATE', inputPath, outputPath)
  expect(result).toMatchSnapshot()
  expect(stripAnsi(result)).toMatchSnapshot()
})
