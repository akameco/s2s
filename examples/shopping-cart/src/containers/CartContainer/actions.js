// @flow
import type { Cart } from '../../types'

import { CHECKOUT_REQUEST, CHECKOUT_SUCCESS, ADD_TO_CART } from './actionTypes'
import type { CheckoutRequest, CheckoutSuccess, AddToCart } from './actionTypes'

export function checkoutRequest(): CheckoutRequest {
  return {
    type: CHECKOUT_REQUEST,
  }
}
export function checkoutSuccess(cart: Cart): CheckoutSuccess {
  return {
    type: CHECKOUT_SUCCESS,
    cart,
  }
}
export function addToCart(productId: number): AddToCart {
  return {
    type: ADD_TO_CART,
    productId,
  }
}
