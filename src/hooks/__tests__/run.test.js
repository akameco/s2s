// @flow
import runHooks from '../run'
import prettierHook from '../prettier'

test('call hooks', () => {
  const mockHook = jest.fn()
  const hooks = [mockHook]
  runHooks('', '', hooks)
  runHooks('', '', hooks)
  expect(mockHook.mock.calls.length).toBe(2)
})

test('return formated code when run prettierHook', () => {
  const hooks = [prettierHook()]
  const code = `const      hello =    'world'`
  const expected = `const hello = 'world'`
  expect(runHooks('', code, hooks).trim()).toEqual(expected)
})

test('run prettierHook with no hooks', () => {
  const code = `const      hello =    'world'`
  expect(runHooks('', code).trim()).toEqual(code)
})
