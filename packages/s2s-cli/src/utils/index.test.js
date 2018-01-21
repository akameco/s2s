// @flow
import fs from 'fs'
import * as babel from 'babel-core'
import * as utils from '.'

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

test('toErrorStack', () => {
  const err = new SyntaxError('error test')
  // $FlowFixMe
  err._babel = 'this is babel error'
  // $FlowFixMe
  err.codeFrame = 1
  const result = utils.toErrorStack(err).replace('\n', '')
  expect(result).toBe('SyntaxError: error test1')
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

test('isAlreadyExist returns false when a code is empty string', () => {
  const spyFs = jest.spyOn(fs, 'readFileSync').mockReturnValue('')
  expect(utils.isAlreadyExist('hoge')).toBe(false)
  spyFs.mockRestore()
})

test('isAlreadyExist returns true when file is already exist', () => {
  const spyFs = jest.spyOn(fs, 'readFileSync').mockReturnValue('exist')
  expect(utils.isAlreadyExist('hoge')).toBe(true)
  spyFs.mockRestore()
})

test('isAlreadyExist returns false when throw error', () => {
  const spyFs = jest.spyOn(fs, 'readFileSync').mockReturnValue(new Error('err'))
  expect(utils.isAlreadyExist('')).toBe(false)
  spyFs.mockRestore()
})
