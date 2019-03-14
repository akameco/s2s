// @flow
'use strict'

module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.*/lib/',
    '/s2s-templates-redux/templates/',
  ],
  watchPathIgnorePatterns: ['/fixtures/copy*'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/fixtures/',
    '/helpers/',
    '/s2s-templates-redux/templates',
  ],
  snapshotSerializers: [
    '<rootDir>/node_modules/pretty-format/build/plugins/ConvertAnsi.js',
  ],
  modulePathIgnorePatterns: ['examples/.*'],
}
