// @flow
import prettierHook from '../prettier'

test('return an empty string on error', () => {
  expect(prettierHook({})('hoge', 'test code')).toBe('test code')
})

test('return "" if throw error', () => {
  expect(prettierHook({})('hoge', 'const x = 1')).toBe('const x = 1\n')
})
