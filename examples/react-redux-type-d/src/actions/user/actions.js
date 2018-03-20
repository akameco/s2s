// @flow
import type { Action } from './types'
import * as constants from './constants'

export const increment = (): Action => {
  return {
    type: constants.INCREMENT,
  }
}

export const fetchUser = (): Action => {
  return {
    type: constants.FETCH_USER,
  }
}
