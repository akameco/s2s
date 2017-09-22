// @flow
import { resolve, join } from 'path'
import rimraf from 'rimraf'
import cpFile from 'cp-file'
import * as utils from '../../utils'
import * as templates from '../templates'

let writeSpy
let logSpy

const fn = x => x

beforeEach(() => {
  rimraf.sync(resolve(__dirname, 'fixtures', 'copy-result.js'))
  logSpy = jest.spyOn(utils, 'log').mockImplementation(fn)
  writeSpy = jest.spyOn(utils, 'writeFileSync').mockImplementation(fn)
})

afterEach(() => {
  logSpy.mockRestore()
  writeSpy.mockRestore()
})

const fixturesPath = resolve(__dirname, 'fixtures')
const getEventPath = (...x) => join(fixturesPath, ...x)
const eventPath = getEventPath('copy-result.js')

test('called log with output result', () => {
  const template = { test: /copy-result.js/, input: 'copy.js' }

  templates.default(eventPath, [template], fixturesPath)
  expect(logSpy.mock.calls[0][0]).toMatchSnapshot()
})

test('already exist', () => {
  const template = { test: /copy-result.js/, input: 'copy.js' }

  templates.default(eventPath, [template], fixturesPath)
  templates.default(eventPath, [template], fixturesPath)
  expect(logSpy.mock.calls.length).toBe(1)
})

test('handle copy error', () => {
  const template = { test: /copy-result.js/, input: 'not-found.js' }

  templates.default(eventPath, [template], fixturesPath)
  expect(logSpy.mock.calls[0][0]).toMatch('no such file or directory')
})

test('handle nomal error', () => {
  const template = { test: /copy-result.js/, input: 'not-found.js' }

  const cpFIleSpy = jest.spyOn(cpFile, 'sync').mockImplementation(() => {
    throw new Error('hello')
  })
  templates.default(eventPath, [template], fixturesPath)
  expect(logSpy.mock.calls[0][0]).toMatch('hello')
  cpFIleSpy.mockRestore()
})

test('template not found', () => {
  const template = { test: /copy-result.js/, input: 'not-found.js' }

  templates.default(eventPath, [template], fixturesPath)
  expect(logSpy).toHaveBeenCalled()
  expect(logSpy.mock.calls[0][0]).toMatch('no such file or directory')
})

test('test regex not match', () => {
  const template = { test: /not-found.js/, input: 'not-found.js' }

  templates.default(eventPath, [template], fixturesPath)
  expect(logSpy).not.toHaveBeenCalled()
})

test('no result when templates = []', () => {
  templates.default(eventPath, [])
  expect(logSpy).not.toHaveBeenCalled()
})

test('no result when templates = undefined', () => {
  templates.default(eventPath)
  expect(logSpy).not.toHaveBeenCalled()
})
