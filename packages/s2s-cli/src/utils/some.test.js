// @flow
import some from './some'

const fixtures = ['a/a', 'a/b', 'a/c', 'b/a', 'b/b', 'b/c']

test('should return true if any matches are found', () => {
  expect(some(fixtures, ['z', 'b/*'])).toBe(true)
})

test('should return false if no matches are found', () => {
  expect(some(fixtures, ['z', 'x/*'])).toBe(false)
})

test('should arrayify a string value', () => {
  expect(some('a', ['*'])).toBe(true)
})
