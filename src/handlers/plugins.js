// @flow
import path from 'path'
import { compile, getOutputPath, write, toErrorStack } from '../utils'
import type { Path, AfterHook, Plugin, PluginOpts } from '../types'
import runHooks from '../runHooks'

function runPlugin(input: Path, plugin: PluginOpts) {
  const { code } = compile(input, {
    babelrc: false,
    plugins: [plugin]
  })
  if (code) {
    return code.trim()
  }
  return ''
}

export default function handlePlugins(
  watcher: Function,
  plugins: Plugin[] = [],
  hooks: AfterHook[] = []
) {
  for (const type of ['add', 'change', 'unlink']) {
    watcher.on(type, (input: Path) => {
      for (const plugin of plugins) {
        if (!plugin.test.test(input)) {
          continue
        }
        try {
          const code = runPlugin(input, plugin.plugin)

          if (!code && code === '') {
            continue
          }

          const result = runHooks(input, code, hooks)

          const outputPath = getOutputPath(plugin.output, input)
          write(outputPath, result)

          console.log(`${input} → ${path.relative(process.cwd(), outputPath)}`)
        } catch (err) {
          console.error(toErrorStack(err))
        }
      }
    })
  }
}
