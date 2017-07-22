// @flow
import type { Action } from './actionTypes'

export type State = {}

const initialState = {}

export default function reducer(
  state: State = initialState,
  action: Action
): $Shape<State> {
  switch (action.type) {
    default:
      return state
  }
}
