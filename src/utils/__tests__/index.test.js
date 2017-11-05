// @flow
import fs from 'fs'
import * as utils from '..'
import * as babel from 'babel-core'

let logSpy
let transformSpy
let errorSpy

const fn = x => x
const noop = () => {}

beforeEach(() => {
  logSpy = jest.spyOn(console, 'log').mockImplementation(fn)
  transformSpy = jest.spyOn(babel, 'transform').mockImplementation(fn)
  errorSpy = jest.spyOn(console, 'error').mockImplementation(fn)
})

afterEach(() => {
  logSpy.mockRestore()
  transformSpy.mockRestore()
  errorSpy.mockRestore()
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

test('getDirAndBaseName', () => {
  const result = utils.getDirAndBaseName('/src/fuga/hoge.js')
  expect(result.basename).toBe('hoge.js')
  expect(result.dirname).toBe('/src/fuga')
})

test('writeFileSync', () => {
  const fsSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(noop)
  utils.writeFileSync('test', 'code')
  expect(fsSpy).toHaveBeenCalled()
  fsSpy.mockRestore()
})

// test('compile', () => {
//   utils.compile('hoge.js', {})
//   expect(transformSpy).toHaveBeenCalled()
// })

test('compile with SyntaxError', () => {
  const err = new SyntaxError()
  // $FlowFixMe
  err._babel = 'babel error'
  err.message = 'test error'
  transformSpy.mockImplementation(() => {
    throw err
  })
  expect(utils.compile('hoge.js', {})).toEqual({ ignored: true })
  expect(errorSpy).toHaveBeenCalled()
  expect(errorSpy.mock.calls[0][0]).toMatch('Error: ENOEN')
})

test('compile with Error', () => {
  const err = new Error()
  // $FlowFixMe
  err.message = 'Error: ENOENT'
  transformSpy.mockImplementation(() => {
    throw err
  })
  expect(utils.compile('hoge.js', {})).toEqual({ ignored: true })
  expect(errorSpy).toHaveBeenCalled()
  expect(errorSpy.mock.calls[0][0]).toMatch('Error')
})

test('isAlreadyExist returns false when a code is empty string', () => {
  const spyFs = jest.spyOn(fs, 'readFileSync').mockReturnValue('')
  expect(utils.isAlreadyExist('hoge')).toBe(false)
  spyFs.mockRestore()
})
