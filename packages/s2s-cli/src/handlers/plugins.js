// @flow
import path from 'path'
import fs from 'fs'
import KeyLocker from 'key-locker'
import defaultHanlder from 's2s-handler-babel'
import type { Path, AfterHook, Plugin, EventType, HanlderFunc } from 'types'
import {
  getOutputPath,
  writeFileSync,
  toErrorStack,
  relativeFromCwd,
  resolveInputPath,
} from '../utils'
import runHooks from '../hooks'
import { formatText } from '../reporters/'

const lock = new KeyLocker()

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

  const result = runHooks(code, filename, hooks)

  const outputPath = plugin.output
    ? getOutputPath(
        plugin.output.replace('[name]', path.parse(eventPath).name),
        eventPath
      )
    : eventPath

  writeFileSync(outputPath, result)
  console.log(formatText('S2S', relativeFromCwd(eventPath), outputPath))
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
        continue // eslint-disable-line
      }

      if (plugin.only && !plugin.only.includes(eventType)) {
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
