// @flow
import path from 'path'

export function relativePath(testPath: string) {
  const dirname = path.dirname(testPath)
  const basename = path.basename(testPath)

  return {
    dirname,
    basename
  }
}
