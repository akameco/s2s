// @flow
import path from 'path'
import fs from 'fs'
import tslintHook from '.'

// load test files
function load(location: string) {
  const files = ['actual.ts', 'expected.ts', 'tmp.ts', 'tslint.json']
  const [actualPath, expectedPath, tmpPath, tslintPath] = files.map(file =>
    path.resolve(location, file)
  )

  const [actualFile, expectedFile] = [actualPath, expectedPath].map(file =>
    fs.readFileSync(file, 'utf8')
  )

  return { actualFile, actualPath, expectedFile, tmpPath, tslintPath }
}

const loc = path.resolve(__dirname, '../__fixtures__/basic')
const { actualFile, actualPath, expectedFile, tmpPath, tslintPath } = load(loc)

jest.useFakeTimers()

let errorSpy
const fn = x => x

beforeEach(() => {
  jest.runAllTimers()
  errorSpy = jest.spyOn(console, 'error').mockImplementation(fn)
  fs.copyFileSync(actualPath, tmpPath)
})

afterEach(() => {
  errorSpy.mockRestore()
  fs.unlinkSync(tmpPath)
})

test('basic', () => {
  const hook = tslintHook({
    test: /\.ts$/,
    lintConfig: tslintPath,
  })
  const res = hook(actualFile, tmpPath)
  expect(res).toBe(expectedFile)
})

test('default options', () => {
  const hook = tslintHook()
  const res = hook(actualFile, tmpPath)
  expect(res).toBe(expectedFile)
})

test('lintConfig option is incorrect', () => {
  const hook = tslintHook({
    test: /\.ts$/,
    lintConfig: `${tslintPath}-bad`,
  })
  const res = hook(actualFile, tmpPath)
  expect(res).toBe(actualFile) // ignored error
  expect(errorSpy.mock.calls[0][0]).toBe('tslint error')
})

test('not match filepath', () => {
  const hook = tslintHook({
    test: /\.html$/,
    lintConfig: `${tslintPath}`,
  })
  const res = hook(actualFile, tmpPath)
  expect(res).toBe(actualFile) // input == output
})
