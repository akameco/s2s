// @flow
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import slash from 'slash'
import type { Path, Template, AfterHook } from './types'
import runHooks from './runHooks'
import { write, relativeFromCwd } from './utils'

import { relativePath } from './reporters/uitls'

const cpFile = require('cp-file')

function runTemplate(input: Path, templateFile: string) {
  cpFile.sync(templateFile, input)
}

function isAlreadyExist(input: Path) {
  try {
    const code = fs.readFileSync(input, 'utf-8')
    if (code.length === 0 || code.trim() === '') {
      return false
    }
    return true
  } catch (err) {
    return false
  }
}

const trimAndFormatPath = (testPath: string) => {
  const { basename, dirname } = relativePath(testPath)

  return slash(chalk.dim(dirname + path.sep) + chalk.bold(basename))
}

const defaultTemplatesDir = path.resolve(process.cwd(), 'templates')

export default function handleTemplates(
  watcher: Function,
  templatesDir: string = defaultTemplatesDir,
  templates: Template[] = [],
  hooks: AfterHook[] = []
) {
  watcher.on('add', (input: Path) => {
    for (const template of templates) {
      if (!template.test.test(input)) {
        continue
      }

      if (isAlreadyExist(input)) {
        continue
      }

      const templatePath = path.join(templatesDir, template.input)
      try {
        runTemplate(input, templatePath)

        const code = fs.readFileSync(input, 'utf-8')
        const result = runHooks(input, code, hooks)
        write(input, result.trim())

        const fomattedText = `${chalk.reset.inverse.bold.green(
          'TEMPLATE'
        )} ${trimAndFormatPath(templatePath)} → ${trimAndFormatPath(
          relativeFromCwd(input)
        )}`

        console.log(fomattedText)
      } catch (err) {
        if (err.name === 'CpFileError' && err.code === 'ENOENT') {
          const errorText = `${chalk.reset.inverse.bold.red(
            'TEMPLATE'
          )} ${trimAndFormatPath(templatePath)}
          no such file or directory`
          console.log(errorText)
        } else {
          console.error(err.stack)
        }
      }
    }
  })
}
