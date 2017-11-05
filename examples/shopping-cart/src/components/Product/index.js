// @flow
import * as React from 'react'
import type { Product as ProductType, ProductInCart } from '../../types'

type Props = $Shape<ProductType & ProductInCart>

const Product = (props: Props) => (
  <div>
    {props.title} - &#36;{props.price}
    {props.inventory ? ` x ${props.inventory}` : null}
  </div>
)

export default Product
