// @flow
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import cpFile from 'cp-file'
import type { Path, Template, AfterHook } from '../types'
import runHooks from '../hooks/run'
import { write } from '../utils'
import { formatText, trimAndFormatPath } from '../reporters'

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

const DEFAULT_TEMPLATES_DIR = 'templates'

export default function handleTemplates(
  watcher: Function,
  templatesDir: string = DEFAULT_TEMPLATES_DIR,
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

        console.log(formatText('TEMPLATE', templatePath, input))
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
