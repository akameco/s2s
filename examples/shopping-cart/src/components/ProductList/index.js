// @flow
import * as React from 'react'

export type Props = {
  children: React.Node,
  title: string,
}

const ProductsList = ({ title, children }: Props) => (
  <div>
    <h3>{title}</h3>
    <div>{children}</div>
  </div>
)

export default ProductsList
