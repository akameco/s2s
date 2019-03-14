// @flow
import path from 'path'
import fs from 'fs'
import type { Path, AfterHook, Plugin, Handler } from 'types'
import {
  getOutputPath,
  writeFileSync,
  relativeFromCwd,
  resolveInputPath,
} from '../utils'
import runHooks from '../hooks'
import { formatText } from '../reporters'

type Opts = {
  eventPath: Path,
  plugin: Plugin,
  hooks: Array<AfterHook>,
}

export function handlePlugin(
  handler: Handler,
  { eventPath, plugin, hooks = [] }: Opts
) {
  const filename = resolveInputPath(plugin.input, eventPath)
  const content = fs.readFileSync(filename, 'utf8')

  const handlerResult = handler(content, { eventPath, plugin, filename })

  const { code, meta } =
    handlerResult && typeof handlerResult === 'string'
      ? { code: handlerResult, meta: { handlerName: 'S2S' } }
      : handlerResult

  if (!code && code === '') {
    return
  }

  const outputFilename = resolveInputPath(plugin.output, eventPath)
  const result = runHooks(code, outputFilename, hooks)

  const outputPath = plugin.output
    ? getOutputPath(
        plugin.output.replace('[name]', path.parse(eventPath).name),
        eventPath
      )
    : eventPath

  writeFileSync(outputPath, result)

  const { handlerName } = meta

  const outputPrefix =
    handlerName +
    (meta.pluginName && meta.pluginName !== '' ? `:${meta.pluginName}` : '')

  console.log(formatText(outputPrefix, relativeFromCwd(eventPath), outputPath))
}
