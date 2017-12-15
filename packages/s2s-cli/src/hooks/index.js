// @flow
import type { Path, AfterHook } from 'types'

export default function runHooks(
  code: string,
  output: Path,
  hooks: AfterHook[] = []
) {
  const result = hooks.reduce((prev, next) => {
    return next(prev, output)
  }, code)

  return result
}
