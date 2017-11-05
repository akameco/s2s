// @flow
import path from 'path'
import fs from 'fs'
import KeyLocker from 'key-locker'
import defaultHanlder from 's2s-handler-babel'
import micromatch from 'micromatch'
import type { Path, AfterHook, Plugin, EventType, HanlderFunc } from 'types'
import {
  getOutputPath,
  writeFileSync,
  toErrorStack,
  log,
  relativeFromCwd,
  resolveInputPath,
} from '../utils'
import runHooks from '../hooks'
import { formatText } from '../reporters/'

type Opts = {
  eventPath: Path,
  plugin: Plugin,
  hooks: AfterHook[],
}

export function handlePlugin(
  handler: HanlderFunc,
  { eventPath, plugin, hooks = [] }: Opts
) {
  const filename = resolveInputPath(plugin.input, eventPath)
  const content = fs.readFileSync(filename, 'utf8')

  const code = handler(content, { eventPath, plugin, filename })

  if (!code && code === '') {
    return
  }

  const result = runHooks(filename, code, hooks)

  const outputPath = plugin.output
    ? getOutputPath(
        plugin.output.replace('[name]', path.parse(eventPath).name),
        eventPath
      )
    : eventPath

  writeFileSync(outputPath, result)
  log(formatText('S2S', relativeFromCwd(eventPath), outputPath))
}

function validate(
  eventPath: Path,
  eventType: EventType,
  plugin: Plugin
): boolean {
  if (typeof plugin.test === 'string' || Array.isArray(plugin.test)) {
    return !micromatch.some(eventPath, plugin.test)
  } else if (!plugin.test.test(eventPath)) {
    return false
  }

  if (plugin.only && !plugin.only.includes(eventType)) {
    return false
  }

  return true
}

const lock = new KeyLocker()

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
      if (!validate(eventPath, eventType, plugin)) {
        continue // eslint-disable-line
      }

      lock.add(eventPath)

      const handler = plugin.handler ? plugin.handler : defaultHanlder
      handlePlugin(handler, { eventPath, plugin, hooks })
    } catch (err) {
      console.error(toErrorStack(err))
    }
  }
}
