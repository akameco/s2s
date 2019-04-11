// @flow
const path = require('path')
const fs = require('fs')
const babel = require('@babel/core')
const globby = require('globby')
const mkdirp = require('mkdirp')
const chalk = require('chalk')
const { getPkgs, PACKAGES_DIR } = require('./getPackages')
const babelrc = require('../babel.config.js')
const clean = require('./clean')

const SRC_DIR = 'src'
const LIB_DIR = 'lib'

const IGNORE = ['**/*.test.js', '**/__fixtures__/**', '**/__tests__/**']
const IGNORE_PATTERN = IGNORE.map(v => `!${v}`)

function getPackageName(file /* : string */) {
  return path.relative(PACKAGES_DIR, file).split(path.sep)[0]
}

function getBuildPath(file /* : string */, buildFolder = LIB_DIR) {
  const pkgName = getPackageName(file)
  const packageSourcePath = path.resolve(PACKAGES_DIR, pkgName, SRC_DIR)
  const pkgLibPath = path.resolve(PACKAGES_DIR, pkgName, buildFolder)
  const relativeToSrcPath = path.relative(packageSourcePath, file)
  return path.resolve(pkgLibPath, relativeToSrcPath)
}

function buildFile(file /* : string */) {
  const destinationPath = getBuildPath(file)
  mkdirp.sync(path.dirname(destinationPath))

  babel.loadOptions(babelrc)
  const { code } = babel.transformFileSync(file)
  // const { code } = babel.transformFileSync(file, opts)
  fs.writeFileSync(destinationPath, code)

  // node v8以上でPublishするのでcp-fileなどは使わない

  if (fs.copyFileSync) {
    fs.copyFileSync(file, `${destinationPath}.flow`)
  }

  process.stdout.write(
    `${path.relative(PACKAGES_DIR, file) +
      chalk.red(' \u21D2 ') +
      path.relative(PACKAGES_DIR, destinationPath)}\n`
  )
}

function buildPackage(p) {
  const srcDir = path.resolve(p, SRC_DIR)
  const pattern = path.resolve(srcDir, '**/*.js')
  const files = globby.sync([pattern, ...IGNORE_PATTERN], { nodir: true })
  files.forEach(file => buildFile(file))
}

function build() {
  const pkgs = getPkgs()
  pkgs.forEach(buildPackage)
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
