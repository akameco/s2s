// @flow
const path = require('path')
const fs = require('fs')
const babel = require('babel-core')
const globby = require('globby')
const mkdirp = require('mkdirp')
const chalk = require('chalk')
const { getPkgs, PACKAGES_DIR } = require('./getPackages')
const clean = require('./clean')

const SRC_DIR = 'src'
const LIB_DIR = 'lib'

const IGNORE = ['**/*.test.js', '**/__fixtures__/**', '**/__tests__/**']
const IGNORE_PATTERN = IGNORE.map(v => `!${v}`)

function readBabelrc() {
  return fs.readFileSync(path.resolve(__dirname, '..', '.babelrc'), 'utf8')
}

const transformOptions = JSON.parse(readBabelrc())
transformOptions.babelrc = false

function getPkgName(file /* : string */) {
  return path.relative(PACKAGES_DIR, file).split(path.sep)[0]
}

function getBuildPath(file /* : string */, buildFolder = LIB_DIR) {
  const pkgName = getPkgName(file)
  const pkgSrcPath = path.resolve(PACKAGES_DIR, pkgName, SRC_DIR)
  const pkgLibPath = path.resolve(PACKAGES_DIR, pkgName, buildFolder)
  const relativeToSrcPath = path.relative(pkgSrcPath, file)
  return path.resolve(pkgLibPath, relativeToSrcPath)
}

function buildFile(file /* : string */) {
  const destPath = getBuildPath(file)
  mkdirp.sync(path.dirname(destPath))

  const opts = Object.assign({}, transformOptions)
  const { code } = babel.transformFileSync(file, opts)
  fs.writeFileSync(destPath, code)

  // node v8以上でPublishするのでcp-fileなどは使わない

  if (fs.copyFileSync) {
    fs.copyFileSync(file, `${destPath}.flow`)
  }

  process.stdout.write(
    `${path.relative(PACKAGES_DIR, file) +
      chalk.red(' \u21D2 ') +
      path.relative(PACKAGES_DIR, destPath)}\n`
  )
}

function buildPkg(p) {
  const srcDir = path.resolve(p, SRC_DIR)
  const pattern = path.resolve(srcDir, '**/*.js')
  const files = globby.sync([pattern, ...IGNORE_PATTERN], { nodir: true })
  files.forEach(file => buildFile(file))
}

function build() {
  const pkgs = getPkgs()
  pkgs.forEach(buildPkg)
}

const files = process.argv.slice(2)

if (files.length > 0) {
  files.forEach(buildFile)
} else {
  process.stdout.write(chalk.bold.inverse(' Clean Building Files... \n'))
  clean()
  process.stdout.write(chalk.bold.inverse(' Building packages... \n'))
  build()
}
