// @flow
import * as React from 'react'
import { connect, type Connector } from 'react-redux'
import type { State, Product } from '../../types'
import ProductItem from '../../components/ProductItem'
import ProductList from '../../components/ProductList'
import { addToCart } from '../CartContainer/logic'
import * as selectors from './selectors'

type Props = {
  products: Product[],
  addToCart: Function,
}

class ProductsContainer extends React.Component<Props> {
  render() {
    const { props } = this
    return (
      <ProductList title="Products">
        {props.products.map(product => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToCartClicked={() => props.addToCart(product.id)}
          />
        ))}
      </ProductList>
    )
  }
}

const ms = (state: State) => ({
  products: selectors.getVisibleProducts(state),
})

const conn: Connector<{}, Props> = connect(ms, { addToCart })

export default conn(ProductsContainer)
