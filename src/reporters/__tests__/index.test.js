// @flow
import { formatText, trimAndFormatPath } from '../'

test('trimAndFormatPath', () => {
  expect(trimAndFormatPath('/src/user/hoge/index.js')).toMatchSnapshot()
})

test('formatText', () => {
  const inputPath = 'src/input/input.js'
  const outputPath = 'src/output/output.js'
  const result = formatText('S2S', inputPath, outputPath)
  expect(result).toMatchSnapshot()
})
