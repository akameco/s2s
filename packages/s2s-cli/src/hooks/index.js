// @flow
import type { Path, AfterHook } from 'types'

export default function runHooks(
  code: string,
  input: Path,
  hooks: AfterHook[] = []
) {
  const result = hooks.reduce((prev, next) => {
    return next(prev, input)
  }, code)

  return result
}
