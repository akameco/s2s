// @flow
import prettierHook from '../prettier'

test('return an empty string on error', () => {
  expect(prettierHook({})('hoge', 'test code')).toBe('test code')
})

test('format', () => {
  expect(prettierHook({})('hoge', 'var x    = 1')).toBe('var x = 1\n')
})
