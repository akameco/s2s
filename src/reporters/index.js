// @flow
import path from 'path'
import slash from 'slash'
import chalk from 'chalk'
import type { HandlerType } from '../types'
import { relativeFromCwd, relativePath } from '../utils'

export const trimAndFormatPath = (testPath: string) => {
  const { basename, dirname } = relativePath(testPath)

  return slash(chalk.dim(dirname + path.sep) + chalk.bold(basename))
}

export const formatText = (
  handlerType: HandlerType,
  inputPath: string,
  outputPath: string
) => {
  const color = handlerType === 'S2S' ? 'green' : 'cyan'
  const input = trimAndFormatPath(inputPath)
  const output = trimAndFormatPath(relativeFromCwd(outputPath))
  const header = chalk.reset.inverse.bold[color](handlerType)

  return `${header} ${input} → ${output}`
}
