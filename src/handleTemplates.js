// @flow
import fs from 'fs'
import type { Path, Template, AfterHook } from './types'
import runHooks from './runHooks'
import { write, relativeFromCwd } from './utils'

const cpFile = require('cp-file')

function runTemplate(input: Path, templateFile: string) {
  try {
    cpFile.sync(templateFile, input)
  } catch (err) {
    console.error(err)
  }
}

export default function handleTemplates(
  watcher: Function,
  templates: Template[] = [],
  hooks: AfterHook[] = []
) {
  watcher.on('add', (input: Path) => {
    for (const template of templates) {
      if (!template.test.test(input)) {
        continue
      }

      try {
        runTemplate(input, template.input)

        const code = fs.readFileSync(input, 'utf-8')

        if (code === '') {
          continue
        }

        const result = runHooks(input, code, hooks)
        write(input, result.trim())

        console.log(
          `${relativeFromCwd(template.input)} → ${relativeFromCwd(input)}`
        )
      } catch (err) {
        console.error(err.stack)
      }
    }
  })
}
