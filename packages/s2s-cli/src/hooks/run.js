// @flow
import type { Path, AfterHook } from '../types'

export default function runHooks(
  input: Path,
  code: string,
  hooks: AfterHook[] = []
) {
  const result = hooks.reduce((prev, next) => {
    return next(input, prev)
  }, code)

  return result
}
