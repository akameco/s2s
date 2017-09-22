// @flow
import prettierHook from '../prettier'

test('return an empty string on error', () => {
  expect(prettierHook({})('hoge', 'test code')).toBe('test code')
})
