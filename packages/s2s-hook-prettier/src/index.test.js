// @flow
import prettierHook from '.'

test('return an empty string on error', () => {
  expect(prettierHook({ parser: 'babel-flow' })('test code')).toBe('test code')
})

test('format', () => {
  expect(prettierHook()('var x    = 1')).toBe('var x = 1\n')
})

test('when no args', () => {
  expect(prettierHook()('var x    = 1')).toBe('var x = 1\n')
})
