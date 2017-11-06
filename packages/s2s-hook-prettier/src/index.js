// @flow
import { format, resolveConfig } from 'prettier'
import type { Code } from 'types'

// eslint-disable-next-line flowtype/no-weak-types
export default function prettierHook(inputOpts: ?Object = {}) {
  return (code: Code) => {
    try {
      const rcOpts = resolveConfig.sync(process.cwd())
      const opts = { ...rcOpts, ...inputOpts }
      return format(code, opts)
    } catch (err) {
      return code
    }
  }
}
