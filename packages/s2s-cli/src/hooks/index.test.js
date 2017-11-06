// @flow
import prettierHook from 's2s-hook-prettier'
import runHooks from '.'

const code = `const      hello =    'world'`
const expected = `const hello = 'world'`

test('call hooks', () => {
  const mockHook = jest.fn()
  const hooks = [mockHook]
  runHooks('', '', hooks)
  runHooks('', '', hooks)
  expect(mockHook.mock.calls.length).toBe(2)
})

test('return formated code when run prettierHook', () => {
  const hooks = [prettierHook()]
  expect(runHooks(code, '', hooks).trim()).toEqual(expected)
})

test('run prettierHook with no hooks', () => {
  expect(runHooks(code, '').trim()).toEqual(code)
})

test('run prettierHook with some hooks', () => {
  const hooks = [prettierHook(), prettierHook()]
  expect(runHooks(code, '', hooks).trim()).toEqual(expected)
})
