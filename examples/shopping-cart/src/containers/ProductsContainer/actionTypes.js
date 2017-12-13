// @flow
import type { Product } from '../../types'

export type Action = ReceiveProducts

export type ReceiveProducts = {
  type: typeof RECEIVE_PRODUCTS,
  products: Product[],
}

export const RECEIVE_PRODUCTS: 'ProductsContainer/RECEIVE_PRODUCTS' =
  'ProductsContainer/RECEIVE_PRODUCTS'

export const Actions = {
  RECEIVE_PRODUCTS,
}
