// @flow
import path from 'path'
import chalk from 'chalk'
import cpFile from 'cp-file'
import type { Path, Template } from '../types'
import { formatText, trimAndFormatPath } from '../reporters'
import { log, isAlreadyExist } from '../utils'

function handleCopyError(err: Error & { path: string, code: string }) {
  if (err.name === 'CpFileError' && err.code === 'ENOENT') {
    const errorText = `${chalk.reset.inverse.bold.red(
      'TEMPLATE'
    )} ${trimAndFormatPath(err.path)}
          no such file or directory`
    log(errorText)
  } else {
    log(err.stack)
  }
}

const DEFAULT_TEMPLATES_DIR = 'templates'

function handleTemplate(input: Path, template: Template, templatesDir: string) {
  if (!template.test.test(input)) {
    return
  }

  if (isAlreadyExist(input)) {
    return
  }

  const templatePath = path.join(templatesDir, template.input)
  cpFile.sync(templatePath, input)

  log(formatText('TEMPLATE', templatePath, input))
}

export default function handleTemplates(
  input: Path,
  templates: Template[] = [],
  templatesDir: string = DEFAULT_TEMPLATES_DIR
) {
  for (const template of templates) {
    try {
      handleTemplate(input, template, templatesDir)
    } catch (err) {
      handleCopyError(err)
    }
  }
}
