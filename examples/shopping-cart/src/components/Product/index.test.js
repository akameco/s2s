// @flow
import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Comp from '.'

const setup = props => {
  const comp = shallow(<Comp {...props} />)

  return {
    comp: comp,
  }
}

test('snapshot: render title and price', () => {
  const { comp } = setup({ title: 'Test Product', price: 9.99 })
  expect(toJson(comp)).toMatchSnapshot()
})

test('render title, price, and inventory when given inventory', () => {
  const { comp } = setup({
    title: 'Test Product',
    price: 9.99,
    inventory: 6,
  })
  expect(comp.text()).toBe('Test Product - $9.99 x 6')
})
