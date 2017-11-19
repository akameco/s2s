// @flow
import { resolve, join } from 'path'
import rimraf from 'rimraf'
import cpFile from 'cp-file'
import stripAnsi from 'strip-ansi'
import pathExists from 'path-exists'
import * as templates from '.'

let logSpy
const fn = x => x

const fixturesPath = resolve(__dirname, '__tests__', 'fixtures')
const getEventPath = (...x) => join(fixturesPath, ...x)
const eventPath = getEventPath('copy-result.js')

beforeEach(() => {
  rimraf.sync(getEventPath('copy-result.js'))
  rimraf.sync(getEventPath('output.js'))
  logSpy = jest.spyOn(console, 'log').mockImplementation(fn)
})

afterEach(() => {
  logSpy.mockRestore()
})

test('called log with output result', () => {
  const template = { test: /copy-result.js/, input: 'copy.js' }

  templates.default(eventPath, [template], fixturesPath)
  expect(stripAnsi(logSpy.mock.calls[0][0])).toMatchSnapshot()
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

test('show output path when add output option', () => {
  const template = {
    test: /copy-result.js/,
    input: 'copy.js',
    output: 'output.js',
  }

  templates.default(eventPath, [template], fixturesPath)
  expect(pathExists.sync(getEventPath('output.js'))).toBe(true)
  expect(stripAnsi(logSpy.mock.calls[0][0])).toMatchSnapshot()
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

test('handlePluginsのPlugin.testオプションはglobを判定できる', () => {
  const template = { test: '**/*.ts', input: 'not-found.js' }

  templates.default(eventPath, [template], fixturesPath)
  expect(logSpy).not.toHaveBeenCalled()
})

test('handlePluginsのPlugin.testオプションはglobの配列を判定できる', () => {
  const template = { test: ['**/*.js', '!copy'], input: 'copy.js' }

  templates.default(eventPath, [template], fixturesPath)
  expect(logSpy).toHaveBeenCalled()
})
