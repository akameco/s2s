// @flow
import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Product from '../Product'
import ProductItem from '.'

const setup = product => {
  const actions = {
    onAddToCartClicked: jest.fn(),
  }

  const component = shallow(<ProductItem product={product} {...actions} />)

  return {
    component,
    actions,
    button: component.find('button'),
    product: component.find(Product),
  }
}

let productProps

beforeEach(() => {
  productProps = {
    id: 1,
    title: 'Product 1',
    price: 9.99,
    inventory: 6,
  }
})

test('snapshot', () => {
  const { component } = setup(productProps)
  expect(toJson(component)).toMatchSnapshot()
})

test('render product', () => {
  const { product } = setup(productProps)
  expect(toJson(product)).toMatchSnapshot()
})

test('render Add To Cart message', () => {
  const { button } = setup(productProps)
  expect(button.text()).toMatch(/^Add to cart/)
})

test('not disable button', () => {
  const { button } = setup(productProps)
  expect(button.prop('disabled')).toStrictEqual('')
})

test('call action on button click', () => {
  const { button, actions } = setup(productProps)
  button.simulate('click')
  expect(actions.onAddToCartClicked).toHaveBeenCalled()
})

describe('when product inventory is 0', () => {
  beforeEach(() => {
    productProps.inventory = 0
  })

  it('render Sold Out message', () => {
    const { button } = setup(productProps)
    expect(button.text()).toMatch(/^Sold Out/)
  })

  it('disable button', () => {
    const { button } = setup(productProps)
    expect(button.prop('disabled')).toStrictEqual('disabled')
  })
})
