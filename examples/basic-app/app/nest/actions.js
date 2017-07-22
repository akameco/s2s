// @flow
import type { Action } from './actionTypes.js'
import { NEST_X } from './constants'

export function nestX(): Action {
  return {
    type: NEST_X,
  }
}
