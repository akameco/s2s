// @flow
import type { State } from '../../types'
import { getProduct } from '../ProductById/selectors'

export const getVisibleProducts = (state: State) =>
  state.ProductsContainer.map(id => getProduct(state, id))
