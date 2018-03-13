// @flow
import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Product from '../Product'
import Comp from '.'

const setup = (total = '0', products = []) => {
  const actions = {
    onCheckoutClicked: jest.fn(),
  }

  const comp = shallow(<Comp products={products} total={total} {...actions} />)

  return {
    comp,
    actions,
    button: comp.find('button'),
    products: comp.find(Product),
    em: comp.find('em'),
    p: comp.find('p'),
  }
}

test('snapshot', () => {
  const { comp } = setup()
  expect(toJson(comp)).toMatchSnapshot()
})

test('display add some products message', () => {
  const { em } = setup()
  expect(em.text()).toMatch(/^Please add some products to cart/)
})

test('should disable button', () => {
  const { button } = setup()
  expect(button.prop('disabled')).toEqual('disabled')
})

describe('when given product', () => {
  const product = [
    {
      id: 1,
      title: 'Product 1',
      price: 9.99,
      quantity: 1,
    },
  ]

  it('render products', () => {
    const { products } = setup('9.99', product)
    const props = {
      title: product[0].title,
      price: product[0].price,
      quantity: product[0].quantity,
    }

    expect(products.at(0).props()).toEqual(props)
  })

  it('not disable button', () => {
    const { button } = setup('9.99', product)
    expect(button.prop('disabled')).toEqual('')
  })

  it('call action on button click', () => {
    const { button, actions } = setup('9.99', product)
    button.simulate('click')
    expect(actions.onCheckoutClicked).toBeCalled()
  })
})
