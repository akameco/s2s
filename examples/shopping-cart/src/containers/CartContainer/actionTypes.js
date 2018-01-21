// @flow
import type { Cart } from '../../types'

export const CHECKOUT_REQUEST: 'CartContainer/CHECKOUT_REQUEST' =
  'CartContainer/CHECKOUT_REQUEST'
export const CHECKOUT_SUCCESS: 'CartContainer/CHECKOUT_SUCCESS' =
  'CartContainer/CHECKOUT_SUCCESS'
export const CHECKOUT_FAILURE: 'CartContainer/CHECKOUT_FAILURE' =
  'CartContainer/CHECKOUT_FAILURE'
export const ADD_TO_CART: 'CartContainer/ADD_TO_CART' =
  'CartContainer/ADD_TO_CART'

export const Actions = {
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE,
  ADD_TO_CART,
}

export type CheckoutRequest = {
  type: typeof CHECKOUT_REQUEST,
}

export type CheckoutSuccess = {
  type: typeof CHECKOUT_SUCCESS,
  cart: Cart,
}

export type CheckoutFailure = {
  type: typeof CHECKOUT_FAILURE,
}

export type AddToCart = {
  type: typeof ADD_TO_CART,
  productId: number,
}

export type Action =
  | CheckoutRequest
  | CheckoutSuccess
  | CheckoutFailure
  | AddToCart
