// @flow
import type { State } from '../../types'
import * as selectros from './selectors'

const state: $Shape<State> = {
  CartContainer: {
    addedIds: [1, 2, 3],
    // $FlowFixMe
    quantityById: { 1: 4, 2: 2, 3: 1 },
  },
  ProductById: {
    // $FlowFixMe
    1: { id: 1, price: 1.99 },
    // $FlowFixMe
    2: { id: 1, price: 4.99 },
    // $FlowFixMe
    3: { id: 1, price: 9.99 },
  },
}

test('getTotal return price total', () => {
  expect(selectros.getTotal(state)).toBe('27.93')
})

test('getCartProducts return products with quantity', () => {
  expect(selectros.getCartProducts(state)).toMatchSnapshot()
})
