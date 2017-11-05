// @flow
import path from 'path'
import KeyLocker from 'key-locker'
import { compile, getOutputPath, writeFileSync, toErrorStack } from '../utils'
import type { Path, AfterHook, Plugin, EventType } from '../types'
import runHooks from '../hooks/run'
import { log, relativeFromCwd, resolveInputPath } from '../utils'
import { formatText } from '../reporters/'

const lock = new KeyLocker()

export function compileWithPlugin(eventPath: Path, plugin: Plugin) {
  const input = resolveInputPath(plugin.input, eventPath)
  const opts = plugin.plugin

  const pluginWithFrom = Array.isArray(opts)
    ? [opts[0], { ...opts[1], from: eventPath }]
    : [opts, { from: eventPath }]

  const { code } = compile(input, {
    babelrc: false,
    plugins: [pluginWithFrom],
  })

  return code ? code.trim() : ''
}

export function handlePlugin(
  eventPath: Path,
  eventType: EventType,
  plugin: Plugin,
  hooks: AfterHook[] = []
) {
  const code = compileWithPlugin(eventPath, plugin)

  if (!code && code === '') {
    return
  }

  const result = runHooks(
    resolveInputPath(plugin.input, eventPath),
    code,
    hooks
  )

  const outputPath = plugin.output
    ? getOutputPath(
        plugin.output.replace('[name]', path.parse(eventPath).name),
        eventPath
      )
    : eventPath

  writeFileSync(outputPath, result)
  log(formatText('S2S', relativeFromCwd(eventPath), outputPath))
}

export default function handlePlugins(
  eventPath: Path,
  eventType: EventType,
  plugins: Plugin[] = [],
  hooks: AfterHook[] = []
) {
  if (lock.has(eventPath)) {
    return
  }

  for (const plugin of plugins) {
    try {
      if (!plugin.test.test(eventPath)) {
        continue
      }

      if (plugin.only && !plugin.only.includes(eventType)) {
        continue
      }

      lock.add(eventPath)
      handlePlugin(eventPath, eventType, plugin, hooks)
    } catch (err) {
      console.error(toErrorStack(err))
    }
  }
}
