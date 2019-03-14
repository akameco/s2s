// @flow
import KeyLocker from 'key-locker'
import type { Path, Plugin, EventType, Config } from 'types'
import { toErrorStack } from '../utils'
import some from '../utils/some'
import { handlePlugin } from './handle-plugin'
import { selectHandler } from './select-handler'

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

const lock = new KeyLocker()

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
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.error(error.message)
        } else {
          console.error(toErrorStack(error))
        }
      }
    }
  }
}
