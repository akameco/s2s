// @flow
import type { State } from '../../types'

export const getProduct = (state: State, id: number) => state.ProductById[id]
