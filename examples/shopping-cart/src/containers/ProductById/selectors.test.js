// @flow
import type { State } from '../../types'
import * as actions from '../ProductsContainer/actions'
import * as selectros from './selectors'
import reducer from './reducer'

let state: $Shape<State>

beforeEach(() => {
  state = {
    ProductById: reducer(
      {},
      actions.receiveProducts([
        { id: 1, title: 'Product 1', inventory: 2, price: 100 },
        { id: 2, title: 'Product 2', inventory: 1, price: 100 },
      ])
    ),
  }
})

test('contains the products from the action', () => {
  expect(selectros.getProduct(state, 1)).toMatchSnapshot()
  expect(selectros.getProduct(state, 2)).toMatchSnapshot()
})

it('contains no other products', () => {
  expect(selectros.getProduct(state, 3)).toEqual(undefined)
})
