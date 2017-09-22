// @flow
import { compile, getOutputPath, write, toErrorStack } from '../utils'
import type { Path, AfterHook, Plugin, PluginOpts } from '../types'
import runHooks from '../hooks/run'
import Lock from '../utils/lock'
import { formatText } from '../reporters/'

function runPlugin(input: Path, plugin: PluginOpts) {
  const { code } = compile(input, {
    babelrc: false,
    plugins: [plugin],
  })
  if (code) {
    return code.trim()
  }
  return ''
}

const lock = new Lock()

export default function handlePlugins(
  input: Path,
  plugins: Plugin[] = [],
  hooks: AfterHook[] = []
) {
  if (lock.has(input)) {
    lock.clear()
    return
  }

  for (const plugin of plugins) {
    if (!plugin.test.test(input)) {
      continue
    }

    lock.add(input)

    const lastInput = plugin.input ? plugin.input : input

    try {
      const code = runPlugin(lastInput, plugin.plugin)

      if (!code && code === '') {
        continue
      }

      const result = runHooks(lastInput, code, hooks)

      const outputPath = plugin.output
        ? getOutputPath(plugin.output, input)
        : input
      write(outputPath, result)

      console.log(formatText('S2S', input, outputPath))
    } catch (err) {
      console.error(toErrorStack(err))
    }
  }
}
