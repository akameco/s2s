// @flow
// @see https://github.com/facebook/jest/blob/77744a24816d0978b6c478987426c36d615864bd/packages/jest-haste-map/src/lib/normalize_path_sep.js

import path from 'path'

const normalizePathSep =
  path.sep === '/'
    ? (filePath: string) => filePath
    : (filePath: string) => filePath.replace(/\//g, path.sep)

export default normalizePathSep
