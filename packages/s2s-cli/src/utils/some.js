// @flow
import micromatch from 'micromatch'

export default function(
  list: string | Array<string>,
  patterns: string | Array<string>
) {
  list = [].concat(list)
  for (const element of list) {
    if (micromatch(element, patterns).length === 1) {
      return true
    }
  }
  return false
}
