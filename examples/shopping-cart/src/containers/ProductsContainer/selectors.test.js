// @flow
import type { State } from '../../types'
import * as selectros from './selectors'
import * as actions from './actions'
import reducer from '../../reducer'
import { addToCart } from '../CartContainer/actions'

let state: State

beforeEach(() => {
  state = reducer(
    {},
    actions.receiveProducts([
      { id: 1, title: 'Product 1', inventory: 2, price: 100 },
      { id: 2, title: 'Product 2', inventory: 1, price: 100 },
    ])
  )
})

test('lists all of the products as visible', () => {
  expect(selectros.getVisibleProducts(state)).toMatchSnapshot()
})

describe('when an item is added to the cart', () => {
  beforeEach(() => {
    state = reducer(state, addToCart(1))
  })

  it('the inventory is reduced', () => {
    expect(selectros.getVisibleProducts(state)).toMatchSnapshot()
  })
})
