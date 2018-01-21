// @flow
'use strict'

module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/', '/.*/lib/', '/templates/'],
  watchPathIgnorePatterns: ['/fixtures/copy*'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/fixtures/',
    '/helpers/',
    '/templates/',
  ],
  snapshotSerializers: [
    '<rootDir>/node_modules/pretty-format/build/plugins/convert_ansi.js',
  ],
  modulePathIgnorePatterns: ['examples/.*'],
}
