// @flow
import * as React from 'react'
import { connect, type Connector } from 'react-redux'
import type { State, ProductInCart } from '../../types'
import Cart from '../../components/Cart'
import * as selectors from './selectors'
import { checkout } from './logic'

type Props = {
  products: ProductInCart[],
  total: string,
  checkout: Function,
}

class CartContainer extends React.Component<Props> {
  render() {
    const { props } = this
    return (
      <Cart
        products={props.products}
        total={props.total}
        onCheckoutClicked={() => props.checkout()}
      />
    )
  }
}

const ms = (state: State) => ({
  products: selectors.getCartProducts(state),
  total: selectors.getTotal(state),
})

const conn: Connector<{}, Props> = connect(ms, { checkout })

export default conn(CartContainer)
