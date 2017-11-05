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

test('snapshot', () => {
  const { comp } = setup()
  expect(toJson(comp)).toMatchSnapshot()
})
