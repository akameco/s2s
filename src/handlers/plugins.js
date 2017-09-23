// @flow
import { compile, getOutputPath, writeFileSync, toErrorStack } from '../utils'
import type { Path, AfterHook, Plugin, PluginOpts } from '../types'
import runHooks from '../hooks/run'
import { log, relativeFromCwd } from '../utils'
import lock from '../utils/lock'
import { formatText } from '../reporters/'

export function compileWithPlugin(input: Path, plugin: PluginOpts) {
  const { code } = compile(input, {
    babelrc: false,
    plugins: [plugin],
  })
  return code ? code.trim() : ''
}

export function handlePlugin(
  eventPath: Path,
  plugin: Plugin,
  hooks: AfterHook[] = []
) {
  if (!plugin.test.test(eventPath)) {
    return
  }
  const input = plugin.input ? plugin.input : eventPath

  const code = compileWithPlugin(input, plugin.plugin)

  if (!code && code === '') {
    return
  }

  lock.add(eventPath)

  const result = runHooks(input, code, hooks)

  const outputPath = plugin.output
    ? getOutputPath(plugin.output, eventPath)
    : eventPath

  writeFileSync(outputPath, result)
  log(formatText('S2S', relativeFromCwd(eventPath), outputPath))
}

export default function handlePlugins(
  input: Path,
  plugins: Plugin[] = [],
  hooks: AfterHook[] = []
) {
  if (lock.has(input)) {
    return
  }

  for (const plugin of plugins) {
    try {
      handlePlugin(input, plugin, hooks)
    } catch (err) {
      console.error(toErrorStack(err))
    }
  }
}
