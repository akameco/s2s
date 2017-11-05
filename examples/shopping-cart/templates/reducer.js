// @flow
import type { Action } from '../../types'
import { Actions } from './actionTypes'

export type State = {}

export const initialState: State = {}

export default function(
  state: State = initialState,
  action: Action
): Exact<State> {
  switch (action.type) {
    default:
      return state
  }
}
