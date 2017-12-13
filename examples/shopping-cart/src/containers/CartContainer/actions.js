// @flow
import type { Cart } from '../../types'

import {
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE,
  ADD_TO_CART,
} from './actionTypes'
import type {
  CheckoutRequest,
  CheckoutSuccess,
  CheckoutFailure,
  AddToCart,
} from './actionTypes'

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
export function checkoutFailure(): CheckoutFailure {
  return {
    type: CHECKOUT_FAILURE,
  }
}
export function addToCart(productId: number): AddToCart {
  return {
    type: ADD_TO_CART,
    productId,
  }
}
