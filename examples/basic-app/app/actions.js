// @flow
import type { Action } from './actionTypes.js'
import { A, B } from './constants'

export function a(): Action {
  return {
    type: A,
  }
}

export function b(): Action {
  return {
    type: B,
  }
}
