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

describe('formats', () => {
  const loc = path.resolve(__dirname, '../__fixtures__')

  it('basic', () => {
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

  it('lintConfig option is incorrect', () => {
    fixturesEnv(loc, 'basic', ops => {
      const { actualFile, tmpPath, tslintPath } = ops
      const hook = tslintHook({
        test: /\.ts$/,
        lintConfig: `${tslintPath}-bad`,
      })
      const res = hook(actualFile, tmpPath)
      expect(res).toBe(actualFile) // ignored error
    })
  })

  it('not match filepath', () => {
    fixturesEnv(loc, 'basic', ops => {
      const { actualFile, tmpPath, tslintPath } = ops
      const hook = tslintHook({
        test: /\.html$/,
        lintConfig: `${tslintPath}-bad`,
      })
      const res = hook(actualFile, tmpPath)
      expect(res).toBe(actualFile) // input == output
    })
  })
})
