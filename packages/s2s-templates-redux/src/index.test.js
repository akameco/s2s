// @flow
import { templates } from '.'

test('snapshot', () => {
  expect(templates).toMatchSnapshot()
})
