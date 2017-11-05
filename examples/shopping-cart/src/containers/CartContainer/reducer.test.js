// @flow
import reducer, { initialState } from './reducer'
import * as actions from './actions'

test('handle initial state', () => {
  expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState)
})

test('handle ADD_TO_CART', () => {
  expect(reducer(initialState, actions.addToCart(1))).toEqual({
    addedIds: [1],
    quantityById: { '1': 1 },
  })
})

test('handle CHECKOUT_REQUEST', () => {
  expect(reducer(initialState, actions.checkoutRequest())).toEqual(initialState)
})

test('when product is already in cart handle ADD_TO_CART action', () => {
  const state = {
    addedIds: [1, 2],
    // $FlowFixMe
    quantityById: { 1: 1, 2: 1 },
  }

  expect(reducer(state, actions.addToCart(2))).toEqual({
    addedIds: [1, 2],
    // $FlowFixMe
    quantityById: { 1: 1, 2: 2 },
  })
})
