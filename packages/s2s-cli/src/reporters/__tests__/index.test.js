// @flow
import stripAnsi from 'strip-ansi'
import { formatText, trimAndFormatPath } from '../'

test('trimAndFormatPath', () => {
  expect(
    stripAnsi(trimAndFormatPath('/src/user/hoge/index.js'))
  ).toMatchSnapshot()
})

test('formatText when handlerType = s2s', () => {
  const inputPath = 'src/input/input.js'
  const outputPath = 'src/output/output.js'
  const result = formatText('S2S', inputPath, outputPath)
  // expect(result).toMatchSnapshot()
  expect(stripAnsi(result)).toMatchSnapshot()
})

test('formatText when handlerType = template', () => {
  const inputPath = 'src/input/input.js'
  const outputPath = 'src/output/output.js'
  const result = formatText('TEMPLATE', inputPath, outputPath)
  // expect(result).toMatchSnapshot()
  expect(stripAnsi(result)).toMatchSnapshot()
})
