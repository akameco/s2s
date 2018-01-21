// @flow
import 'babel-polyfill' // eslint-disable-line
import chalk from 'chalk'
import chokidar from 'chokidar'
import prettierHook from 's2s-hook-prettier'
import type { Config, Path, AnymatchPath } from 'types'
import handlePlugins from './handlers'
import handleTemplates from './templates'

function createWatcher(rootPath: Path, ignored: AnymatchPath) {
  const watcher = chokidar.watch(rootPath, {
    cwd: process.cwd(),
    ignoreInitial: true,
    ignored,
  })

  return watcher
}

export default (inputConfg: Config) => {
  const config = {
    ...{
      watch: './**/*.js',
      plugins: [],
      templates: [],
      afterHooks: [],
      prettier: true,
      ignored: ['.git/', 'node_modules/'],
    },
    ...inputConfg,
  }

  const { watch, plugins, templates, afterHooks, ignored } = config

  if (!watch) {
    throw new Error('required watch')
  }

  if (!Array.isArray(plugins)) {
    throw new TypeError(`Expected a Array, got ${typeof plugins}`)
  }

  if (!Array.isArray(templates)) {
    throw new TypeError(`Expected a Array got ${typeof templates}`)
  }

  if (!Array.isArray(afterHooks)) {
    throw new TypeError(`Expected a Array got ${typeof afterHooks}`)
  }
  const watcher = createWatcher(watch, ignored)

  if (config.prettier) {
    afterHooks.push(prettierHook())
  }

  if (plugins.length > 0) {
    for (const type of ['add', 'change', 'unlink']) {
      watcher.on(type, (input: Path) => {
        handlePlugins(input, type, config)
      })
    }
  }

  if (templates.length > 0) {
    watcher.on('add', (input: Path) => {
      handleTemplates(input, templates, config.templatesDir)
    })
  }

  const msg = `${chalk.bold(
    's2s'
  )} started monitoring. Enjoy coding with ${chalk.bold('s2s')}.`

  console.log(msg)

  return watcher
}
