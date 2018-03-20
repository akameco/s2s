// @flow
import * as actions from './actions'

test('INCREMENT', () => {
  expect(actions.increment()).toMatchSnapshot()
})

test('FETCH_USER', () => {
  expect(actions.fetchUser()).toMatchSnapshot()
})
