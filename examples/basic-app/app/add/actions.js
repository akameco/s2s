// @flow
import type { Action } from './actionTypes.js'
import { A, C } from './constants'

export function a(): Action {
  return {
    type: A,
  }
}

export function c(): Action {
  return {
    type: C,
  }
}
