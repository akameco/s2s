// @flow
const rimfaf = require('rimraf')

function clean(files /* : string */ = 'packages/**/lib') {
  rimfaf.sync(files)
}

module.exports = clean
