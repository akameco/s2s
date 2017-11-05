// @flow
import { combineReducers } from 'redux'
import CartContainer from './containers/CartContainer/reducer'
import ProductById from './containers/ProductById/reducer'
import ProductsContainer from './containers/ProductsContainer/reducer'

export default combineReducers({
  CartContainer,
  ProductById,
  ProductsContainer,
})
