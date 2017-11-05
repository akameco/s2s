// @flow
import type { State } from '../../types'
import { getProduct } from '../ProductById/selectors'

export const getQuantity = (state: State, productId: number) =>
  state.CartContainer.quantityById[productId] || 0

export const getAddedIds = (state: State) => state.CartContainer.addedIds

export const getCartProducts = (state: State) =>
  getAddedIds(state).map(id => ({
    ...getProduct(state, id),
    quantity: getQuantity(state, id),
  }))

export const getTotal = (state: State) =>
  getAddedIds(state)
    .reduce(
      (total, id) =>
        total + getProduct(state, id).price * getQuantity(state, id),
      0
    )
    .toFixed(2)
