// @flow
import path from 'path'
import fs from 'fs'
import tslintHook from '.'

describe('formats', () => {
  const loc = path.resolve(__dirname, '../__fixtures__')
  const dirs = fs.readdirSync(loc)
  for (const dir of dirs) {
    it(`case: ${dir}`, () => {
      const files = ['actual.ts', 'expected.ts', 'tmp.ts', 'tslint.json']
      const [actualPath, expectedPath, tmpPath, tslintPath] = files.map(file =>
        path.resolve(loc, dir, file)
      )

      try {
        // $FlowFixMe
        fs.copyFileSync(actualPath, tmpPath) // Node v8.5.0~
        console.log('tmpPath', tmpPath)

        const [actualFile, expectedFile] = [actualPath, expectedPath].map(
          file => fs.readFileSync(file, 'utf8')
        )

        const hook = tslintHook({
          test: /\.ts$/,
          lintConfig: tslintPath,
        })
        const res = hook(actualFile, tmpPath)
        expect(res).toBe(expectedFile)
      } finally {
        fs.unlinkSync(tmpPath)
      }
    })
  }
})
