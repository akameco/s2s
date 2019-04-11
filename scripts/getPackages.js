const path = require('path')
const fs = require('fs')

const PACKAGES = 'packages'
const PACKAGES_DIR = path.resolve(__dirname, '..', PACKAGES)

function getPkgs() {
  return fs
    .readdirSync(PACKAGES_DIR)
    .map(file => path.resolve(PACKAGES_DIR, file))
    .filter(f => fs.lstatSync(path.resolve(f)).isDirectory())
}

module.exports = {
  getPkgs,
  PACKAGES,
  PACKAGES_DIR,
}
