// @flow
import * as utils from '..'

let logSpy

const fn = x => x

beforeEach(() => {
  logSpy = jest.spyOn(console, 'log').mockImplementation(fn)
})

afterEach(() => {
  logSpy.mockRestore()
})

test('log', () => {
  utils.log('hello')
  expect(logSpy).toHaveBeenCalledWith('hello')
})

test('getOutputPath when output = absolute path', () => {
  const result = utils.getOutputPath(__dirname, 'input')
  expect(result).toBe(__dirname)
})

test('getOutputPath when output = relative path', () => {
  const result = utils.getOutputPath('actions.js', '/src/actionsType.js')
  expect(result).toBe('/src/actions.js')
})
