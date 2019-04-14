// @flow
import { format, resolveConfig } from 'prettier'
import type { Code } from 'types'

// eslint-disable-next-line flowtype/no-weak-types
export default function prettierHook(inputOptions: any = { parser: 'babel' }) {
  return (code: Code) => {
    try {
      const rcOptions = resolveConfig.sync(process.cwd())
      const opts = { ...rcOptions, ...inputOptions }
      return format(code, opts)
    } catch (error) {
      return code
    }
  }
}
