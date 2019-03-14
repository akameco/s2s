// @flow
const fs = require('fs')
const { execSync } = require('child_process')
const path = require('path')
const chalk = require('chalk')
const { getPkgs } = require('./getPackages')

const BUILD_CMD = `node ${path.resolve(__dirname, './build.js')}`

let filesToBuild = new Map()

const exists = filename => {
  try {
    return fs.statSync(filename).isFile()
  } catch (error) {}
  return false
}

const rebuild = filename => filesToBuild.set(filename, true)

getPkgs().forEach(p => {
  const srcDir = path.resolve(p, 'src')
  try {
    fs.accessSync(srcDir, fs.F_OK)
    fs.watch(path.resolve(p, 'src'), { recursive: true }, (event, filename) => {
      const filePath = path.resolve(srcDir, filename)

      if ((event === 'change' || event === 'rename') && exists(filePath)) {
        console.log(chalk.inverse.green(event.toUpperCase()), `${filename}`)
        rebuild(filePath)
      } else {
        const buildFile = path.resolve(srcDir, '..', 'lib', filename)
        try {
          fs.unlinkSync(buildFile)
          fs.unlinkSync(`${buildFile}.flow`)
          process.stdout.write(
            `${`${chalk.inverse.red('DELETE')} ${path.relative(
              path.resolve(srcDir, '..', '..'),
              buildFile
            )}`}\n`
          )
        } catch (error) {}
      }
    })
  } catch (error) {}
})

setInterval(() => {
  const files = [...filesToBuild.keys()]
  if (files.length > 0) {
    filesToBuild = new Map()
    try {
      execSync(`${BUILD_CMD} ${files.join(' ')}`, { stdio: [0, 1, 2] })
    } catch (error) {}
  }
}, 100)

console.log(chalk.bold.inverse('Watching for changes...'))
