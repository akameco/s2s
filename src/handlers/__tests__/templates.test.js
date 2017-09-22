// @flow
import { resolve } from 'path'
import rimraf from 'rimraf'
import * as utils from '../../utils'
import * as templates from '../templates'

let writeSpy
let logSpy

const fn = x => x

beforeEach(() => {
  rimraf.sync(resolve(__dirname, 'fixtures', 'copy-result.js'))
  logSpy = jest.spyOn(utils, 'log').mockImplementation(fn)
  writeSpy = jest.spyOn(utils, 'write').mockImplementation(fn)
})

afterEach(() => {
  logSpy.mockRestore()
  writeSpy.mockRestore()
})

test('called log with output result', () => {
  const eventPath = resolve(__dirname, 'fixtures', 'copy-result.js')
  const tmpDir = resolve(__dirname, 'fixtures')
  const template = { test: /copy-result.js/, input: 'copy.js' }

  templates.default(eventPath, [template], tmpDir)
  expect(logSpy.mock.calls[0][0]).toMatchSnapshot()
})

test('already exist', () => {
  const eventPath = resolve(__dirname, 'fixtures', 'copy-result.js')
  const tmpDir = resolve(__dirname, 'fixtures')
  const template = { test: /copy-result.js/, input: 'copy.js' }

  templates.default(eventPath, [template], tmpDir)
  templates.default(eventPath, [template], tmpDir)
  expect(logSpy.mock.calls.length).toBe(1)
})

test('handle error', () => {
  const eventPath = resolve(__dirname, 'fixtures', 'copy-result.js')
  const tmpDir = resolve(__dirname, 'fixtures')
  const template = { test: /copy-result.js/, input: 'not-found.js' }

  templates.default(eventPath, [template], tmpDir)
  expect(logSpy.mock.calls[0][0]).toMatch('no such file or directory')
})

test('template not found', () => {
  const eventPath = resolve(__dirname, 'fixtures', 'copy-result.js')
  const tmpDir = resolve(__dirname, 'fixtures')
  const template = { test: /copy-result.js/, input: 'not-found.js' }

  templates.default(eventPath, [template], tmpDir)
  expect(logSpy).toHaveBeenCalled()
  expect(logSpy.mock.calls[0][0]).toMatch('no such file or directory')
})

test('test regex not match', () => {
  const eventPath = resolve(__dirname, 'fixtures', 'copy-result.js')
  const tmpDir = resolve(__dirname, 'fixtures')
  const template = { test: /not-found.js/, input: 'not-found.js' }

  templates.default(eventPath, [template], tmpDir)
  expect(logSpy).not.toHaveBeenCalled()
})
