// @flow
import type { Product } from '../../types'

export const RECEIVE_PRODUCTS: 'ProductsContainer/RECEIVE_PRODUCTS' =
  'ProductsContainer/RECEIVE_PRODUCTS'

export const Actions = {
  RECEIVE_PRODUCTS,
}

export type ReceiveProducts = {
  type: typeof RECEIVE_PRODUCTS,
  products: Product[],
}

export type Action = ReceiveProducts
