// @flow
import * as React from 'react'
import type { ProductInCart as ProductType } from '../../types'
import Product from '../Product'

type Props = {
  products: ProductType[],
  total: string,
  onCheckoutClicked: Function,
}

const Cart = (props: Props) => {
  const hasProducts = props.products.length > 0
  const nodes = hasProducts ? (
    props.products.map(product => (
      <Product
        title={product.title}
        price={product.price}
        quantity={product.quantity}
        key={product.id}
      />
    ))
  ) : (
    <em>Please add some products to cart.</em>
  )

  return (
    <div>
      <h3>Your Cart</h3>
      <div>{nodes}</div>
      <p>Total: &#36;{props.total}</p>
      <button
        onClick={props.onCheckoutClicked}
        disabled={hasProducts ? '' : 'disabled'}
      >
        Checkout
      </button>
    </div>
  )
}

export default Cart
