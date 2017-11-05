// @flow
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'
import type { Action as _Action } from './action'
import type { State as _State } from './state'

export type State = _State
export type Action = _Action

export type GetState = () => State

export type ThunkAction = (
  dispatch: Dispatch,
  getState: GetState
) => void | Promise<void>

type ThunkDispatch<A> = ThunkAction => A

export type Dispatch = ReduxDispatch<Action> & ThunkDispatch<Action>
export type Store = ReduxStore<State, Action, Dispatch>

// Shopping Cart
type BaseProduct = {
  id: number,
  title: string,
  price: number,
}

export type Product = BaseProduct & {
  inventory: number,
}

export type ProductInCart = BaseProduct & {
  quantity: number,
}

export type QuantityById = { [id: number]: number }

export type Cart = {
  addedIds: number[],
  quantityById: QuantityById,
}
