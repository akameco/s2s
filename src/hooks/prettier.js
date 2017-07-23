// @flow
import { format } from 'prettier'

export default function prettierHook(opts: Object) {
  return (eventPath: string, code: string) => {
    try {
      return format(code, opts)
    } catch (err) {
      return code
    }
  }
}
