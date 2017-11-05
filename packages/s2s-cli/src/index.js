// @flow
import 'babel-polyfill' // eslint-disable-line
import chalk from 'chalk'
import chokidar from 'chokidar'
import type { Opts, Path } from 'types'
import handlePlugins from './handlers/plugins'
import handleTemplates from './handlers/templates'
import * as hooks from './hooks'
import { log } from './utils'

export { hooks }

function createWatcher(rootPath: Path) {
  const watcher = chokidar.watch(rootPath, {
    cwd: process.cwd(),
    ignoreInitial: true,
  })

  return watcher
}

export default ({
  watch,
  plugins = [],
  templates = [],
  afterHooks = [],
  templatesDir,
  prettier: isPrettier = true,
}: Opts) => {
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

  const watcher = createWatcher(watch)

  if (isPrettier) {
    afterHooks.push(hooks.prettier())
  }

  if (plugins.length > 0) {
    for (const type of ['add', 'change', 'unlink']) {
      watcher.on(type, (input: Path) => {
        handlePlugins(input, type, plugins, afterHooks)
      })
    }
  }

  if (templates.length > 0) {
    watcher.on('add', (input: Path) => {
      handleTemplates(input, templates, templatesDir)
    })
  }

  log(
    `${chalk.bold('s2s')} started monitoring. Enjoy coding with ${chalk.bold(
      's2s'
    )}.`
  )

  return watcher
}
