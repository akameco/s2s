// @flow
import type { Cart } from '../../types'

export const CHECKOUT_REQUEST: 'CartContainer/CHECKOUT_REQUEST' =
  'CartContainer/CHECKOUT_REQUEST'
export const CHECKOUT_SUCCESS: 'CartContainer/CHECKOUT_SUCCESS' =
  'CartContainer/CHECKOUT_SUCCESS'
export const ADD_TO_CART: 'CartContainer/ADD_TO_CART' =
  'CartContainer/ADD_TO_CART'

export const Actions = {
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  ADD_TO_CART,
}

export type CheckoutRequest = {
  type: typeof CHECKOUT_REQUEST,
}

export type CheckoutSuccess = {
  type: typeof CHECKOUT_SUCCESS,
  cart: Cart,
}

export type AddToCart = {
  type: typeof ADD_TO_CART,
  productId: number,
}

export type Action = CheckoutRequest | CheckoutSuccess | AddToCart
