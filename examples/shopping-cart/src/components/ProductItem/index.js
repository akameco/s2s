// @flow
import * as React from 'react'
import type { Product as ProductType } from '../../types'
import Product from '../Product'

type Props = {
  product: ProductType,
  onAddToCartClicked: Function,
}

const ProductItem = ({ product, onAddToCartClicked }: Props) => (
  <div style={{ marginBottom: 20 }}>
    <Product {...product} />
    <button
      onClick={onAddToCartClicked}
      disabled={product.inventory > 0 ? '' : 'disabled'}
    >
      {product.inventory > 0 ? 'Add to cart' : 'Sold Out'}
    </button>
  </div>
)

export default ProductItem
