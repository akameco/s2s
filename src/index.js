// @flow
import 'babel-polyfill'
import type { Opts, Path } from './types'
import handlePlugins from './handlers/plugins'
import handleTemplates from './handlers/templates'
import * as hooks from './hooks'

const chokidar = require('chokidar')

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
  plugins,
  templates,
  afterHooks = [],
  templatesDir,
  prettier: isPrettier = true,
}: Opts) => {
  if (!watch) {
    throw new Error('required watch')
  }

  if (plugins && !Array.isArray(plugins)) {
    throw new TypeError(`Expected a Array, got ${typeof plugins}`)
  }

  if (templates && !Array.isArray(templates)) {
    throw new TypeError(`Expected a Array got ${typeof templates}`)
  }

  if (!Array.isArray(afterHooks)) {
    throw new TypeError(`Expected a Array got ${typeof afterHooks}`)
  }

  const watcher = createWatcher(watch)

  if (isPrettier) {
    afterHooks.push(hooks.prettier())
  }

  if (plugins) {
    handlePlugins(watcher, plugins, afterHooks)
  }

  if (templates) {
    handleTemplates(watcher, templatesDir, templates, afterHooks)
  }

  return watcher
}
