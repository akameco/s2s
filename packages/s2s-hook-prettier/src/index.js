// @flow
import { format, resolveConfig } from 'prettier'

// eslint-disable-next-line flowtype/no-weak-types
export default function prettierHook(inputOpts: ?Object = {}) {
  return (_: string, code: string) => {
    try {
      const rcOpts = resolveConfig.sync(process.cwd())
      const opts = { ...rcOpts, ...inputOpts }
      return format(code, opts)
    } catch (err) {
      return code
    }
  }
}
