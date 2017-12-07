// @flow
import path from 'path'
import fs from 'fs'
import tslintHook from '.'

// load fixtures, run tet, delete tmpfile
function fixturesEnv(
  location: string,
  name: string,
  fn: ({
    actualFile: string,
    expectedFile: string,
    tmpPath: string,
    tslintPath: string,
  }) => void
) {
  const files = ['actual.ts', 'expected.ts', 'tmp.ts', 'tslint.json']
  const [actualPath, expectedPath, tmpPath, tslintPath] = files.map(file =>
    path.resolve(location, name, file)
  )

  try {
    // $FlowFixMe
    fs.copyFileSync(actualPath, tmpPath) // Node v8.5.0~

    const [actualFile, expectedFile] = [actualPath, expectedPath].map(file =>
      fs.readFileSync(file, 'utf8')
    )

    fn({ actualFile, expectedFile, tmpPath, tslintPath })
  } finally {
    fs.unlinkSync(tmpPath)
  }
}

const loc = path.resolve(__dirname, '../__fixtures__')

let errorSpy

const fn = x => x

jest.useFakeTimers()

beforeEach(() => {
  jest.runAllTimers()
  errorSpy = jest.spyOn(console, 'error').mockImplementation(fn)
})

afterEach(() => {
  errorSpy.mockRestore()
})

test('basic', () => {
  fixturesEnv(loc, 'basic', ops => {
    const { actualFile, expectedFile, tmpPath, tslintPath } = ops
    const hook = tslintHook({
      test: /\.ts$/,
      lintConfig: tslintPath,
    })
    const res = hook(actualFile, tmpPath)
    expect(res).toBe(expectedFile)
  })
})

test('default options', () => {
  fixturesEnv(loc, 'basic', ops => {
    const { actualFile, expectedFile, tmpPath } = ops
    const hook = tslintHook()
    const res = hook(actualFile, tmpPath)
    expect(res).toBe(expectedFile)
  })
})

test('lintConfig option is incorrect', () => {
  fixturesEnv(loc, 'basic', ops => {
    const { actualFile, tmpPath, tslintPath } = ops
    const hook = tslintHook({
      test: /\.ts$/,
      lintConfig: `${tslintPath}-bad`,
    })
    const res = hook(actualFile, tmpPath)
    expect(res).toBe(actualFile) // ignored error
    expect(errorSpy.mock.calls[0][0]).toBe('tslint error')
  })
})

test('not match filepath', () => {
  fixturesEnv(loc, 'basic', ops => {
    const { actualFile, tmpPath, tslintPath } = ops
    const hook = tslintHook({
      test: /\.html$/,
      lintConfig: `${tslintPath}`,
    })
    const res = hook(actualFile, tmpPath)
    expect(res).toBe(actualFile) // input == output
  })
})
