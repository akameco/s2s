// @flow
import type { Product } from '../../types'

import { RECEIVE_PRODUCTS } from './actionTypes'
import type { ReceiveProducts } from './actionTypes'

export function receiveProducts(products: Array<Product>): ReceiveProducts {
  return {
    type: RECEIVE_PRODUCTS,
    products,
  }
}
