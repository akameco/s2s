// @flow
import type { Action, Cart, QuantityById } from '../../types'
import { Actions } from './actionTypes'

export type State = Cart

export const initialState: State = {
  addedIds: [],
  quantityById: {},
}

function addedIds<S: number[]>(state: S, action: Action): S {
  switch (action.type) {
    case Actions.ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state
      }
      return [...state, action.productId]
    default:
      return state
  }
}

function quantityById<S: QuantityById>(state: S, action: Action): Exact<S> {
  switch (action.type) {
    case Actions.ADD_TO_CART:
      const { productId } = action
      return {
        ...state,
        [productId]: (state[productId] || 0) + 1,
      }
    default:
      return state
  }
}

export default function(
  state: State = initialState,
  action: Action
): Exact<State> {
  switch (action.type) {
    case Actions.CHECKOUT_REQUEST:
      return initialState
    case Actions.ADD_TO_CART:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action),
      }
    default:
      return state
  }
}
