// @flow
import type { Action, Product } from '../../types'
import { Actions } from '../ProductsContainer/actionTypes'
import { Actions as CartActions } from '../CartContainer/actionTypes'

export type State = { [id: number]: Product }

export const initialState: State = {}

function products(state: Product, action: Action): Exact<Product> {
  switch (action.type) {
    case CartActions.ADD_TO_CART:
      return { ...state, inventory: state.inventory - 1 }
    default:
      return state
  }
}

export default function(
  state: State = initialState,
  action: Action
): Exact<State> {
  switch (action.type) {
    case Actions.RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce((obj, product) => {
          obj[product.id] = product
          return obj
        }, {}),
      }
    case CartActions.ADD_TO_CART: {
      const id = action.productId
      return { ...state, [id]: products(state[id], action) }
    }
    default:
      return state
  }
}
