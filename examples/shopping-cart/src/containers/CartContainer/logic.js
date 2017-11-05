// @flow
import * as shop from '../../api/shop'
import type { ThunkAction, Product } from '../../types'
import { receiveProducts } from '../ProductsContainer/actions'
import * as actions from './actions'

export function getAllProducts(): ThunkAction {
  return dispatch => {
    shop.getProducts((products: Product[]) => {
      dispatch(receiveProducts(products))
    })
  }
}

export function checkout(products: Product[]): ThunkAction {
  return (dispatch, getState) => {
    const cart = getState().CartContainer
    dispatch(actions.checkoutRequest())

    shop.buyProducts(products, () => {
      dispatch(actions.checkoutSuccess(cart))
    })
  }
}

export function addToCart(productId: number): ThunkAction {
  return (dispatch, getState) => {
    if (getState().ProductById[productId].inventory > 0) {
      dispatch(actions.addToCart(productId))
    }
  }
}
