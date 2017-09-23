// @flow
'use strict'

module.exports = {
  testEnvironment: 'node',
  watchPathIgnorePatterns: ['/fixtures/copy*'],
  testPathIgnorePatterns: ['/node_modules/', '/fixtures/', '/helpers/'],
  snapshotSerializers: [
    '<rootDir>/node_modules/pretty-format/build/plugins/convert_ansi.js',
  ],
}
