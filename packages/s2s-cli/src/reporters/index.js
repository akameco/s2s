// @flow
import path from 'path'
import slash from 'slash'
import chalk from 'chalk'
import type { HandlerType } from 'types'
import { relativeFromCwd, getDirAndBaseName } from '../utils'

export const trimAndFormatPath = (testPath: string) => {
  const { basename, dirname } = getDirAndBaseName(testPath)

  return slash(chalk.dim(dirname + path.sep) + chalk.bold(basename))
}

export const formatText = (
  handlerType: HandlerType | string,
  inputPath: string,
  outputPath: string
) => {
  const color = handlerType === 'TEMPLATE' ? 'cyan' : 'green'
  const input = trimAndFormatPath(inputPath)
  const output = trimAndFormatPath(relativeFromCwd(outputPath))
  // $FlowFixMe
  const header = chalk.reset.inverse.bold[color](handlerType)

  return `${header} ${input} → ${output}`
}
