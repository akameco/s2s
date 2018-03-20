// @flow
import type { Action } from './types'
import * as constants from './constants'

export const fetchUser = (): Action => {
  return {
    type: constants.FETCH_USER,
  }
}
