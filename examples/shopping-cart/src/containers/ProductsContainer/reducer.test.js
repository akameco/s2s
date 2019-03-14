// @flow
import reducer, { initialState } from './reducer'
import * as actions from './actions'

test('provide the initial state', () => {
  expect(reducer(undefined, { type: '@@INIT' })).toStrictEqual(initialState)
})

test('handle RECEIVE_PRODUCTS', () => {
  const product = { id: 1, price: 100, title: 'test', inventory: 1 }
  expect(
    reducer(initialState, actions.receiveProducts([product]))
  ).toStrictEqual([1])
})
