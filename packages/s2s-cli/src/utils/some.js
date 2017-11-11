// @flow
import micromatch from 'micromatch'

export default function(list: string | string[], patterns: string | string[]) {
  list = [].concat(list)
  for (let i = 0; i < list.length; i++) {
    if (micromatch(list[i], patterns).length === 1) {
      return true
    }
  }
  return false
}
