// @flow
import path from 'path'
import fs from 'fs'
import micromatch from 'micromatch'
import KeyLocker from 'key-locker'
import handlerBabel from 's2s-handler-babel'
import hanlderTypeScript from 's2s-handler-typescript'
import type { Path, AfterHook, Plugin, EventType, Handler, Config } from 'types'
import {
  getOutputPath,
  writeFileSync,
  toErrorStack,
  relativeFromCwd,
  resolveInputPath,
} from '../utils'
import some from '../utils/some'
import runHooks from '../hooks'
import { formatText } from '../reporters/'

const lock = new KeyLocker()

type Opts = {
  eventPath: Path,
  plugin: Plugin,
  hooks: AfterHook[],
}

export function handlePlugin(
  handler: Handler,
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

function validate(plugin: Plugin, eventPath: Path, eventType: EventType) {
  if (typeof plugin.test === 'string' || Array.isArray(plugin.test)) {
    return some(eventPath, plugin.test)
  } else if (!plugin.test.test(eventPath)) {
    return false
  }

  if (plugin.only && !plugin.only.includes(eventType)) {
    return false
  }

  return true
}

type HandlerMapper = { [extensions: string]: Handler }

const DEFAULT_HANDLE_MAPPER = {
  '*.(js|jsx)': handlerBabel,
  '*.(ts|tsx)': hanlderTypeScript,
}

export function selectHandler(
  handlerMapper: HandlerMapper,
  handler?: Handler,
  filepath: Path
): Handler {
  if (handler) {
    return handler
  }

  const finalHandlerMapper = Object.assign(
    {},
    handlerMapper,
    DEFAULT_HANDLE_MAPPER // デフォルトのハンドラの優先度は低いため
  )

  for (const key of Object.keys(finalHandlerMapper)) {
    if (micromatch.isMatch(filepath, key, { matchBase: true })) {
      return finalHandlerMapper[key]
    }
  }

  throw new Error('any handlers not match')
}

export default function handlePlugins(
  eventPath: Path,
  eventType: EventType,
  config: $Shape<Config> = {}
) {
  if (lock.has(eventPath)) {
    return
  }

  const { plugins = [], afterHooks: hooks = [], handlerMapper = {} } = config

  for (const plugin of plugins) {
    if (validate(plugin, eventPath, eventType)) {
      lock.add(eventPath)

      try {
        const handler = selectHandler(handlerMapper, plugin.handler, eventPath)
        handlePlugin(handler, { eventPath, plugin, hooks })
      } catch (err) {
        console.error(toErrorStack(err))
      }
    }
  }
}
