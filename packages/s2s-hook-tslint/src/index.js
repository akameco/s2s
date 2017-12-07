// @flow
import fs from 'fs'
import { Linter, Configuration } from 'tslint'
import type { AfterHook, Path } from 'types'

type TslintHookOptions = {
  test?: RegExp,
  lintConfig?: Path,
}

export default function(argOptions: ?TslintHookOptions = {}): AfterHook {
  const option = {
    test: /\.(ts|tsx)$/,
    ...argOptions,
  }

  return function(code, path) {
    const match = option.test && path.match(option.test)
    if (!match) {
      return code
    }

    try {
      const linter = new Linter({
        fix: true,
      })

      const conf = Configuration.findConfiguration(option.lintConfig, path)
        .results
      linter.lint(path, code, conf)
      return fs.readFileSync(path, 'utf8')
    } catch (e) {
      console.error('tslint error', e)
    }

    return code
  }
}
