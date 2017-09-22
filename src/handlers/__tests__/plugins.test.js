// @flow
import path from 'path'
import * as utils from '../../utils'
import lock from '../../utils/lock'
import * as plugins from '../plugins'
import _plugin from './helpers/identifer-reverse-plugin'

let errorSpy
let logSpy
let writeSpy

const fn = x => x

const getEventPath = () => path.resolve(__dirname, 'fixtures', 'a.js')

beforeEach(() => {
  errorSpy = jest.spyOn(console, 'error').mockImplementation(fn)
  logSpy = jest.spyOn(utils, 'log').mockImplementation(fn)
  writeSpy = jest.spyOn(utils, 'writeFileSync').mockImplementation(fn)
})

afterEach(() => {
  errorSpy.mockRestore()
  logSpy.mockRestore()
  writeSpy.mockRestore()
})

test('compileWithPlugin', () => {
  const result = plugins.compileWithPlugin(getEventPath(), _plugin)
  expect(result).toMatchSnapshot()
})

test('handlePlugin when eventPath not match', () => {
  const spyFn = jest.spyOn(plugins, 'compileWithPlugin')
  const plugin = { test: /hoge/, plugin: _plugin }
  plugins.handlePlugin(getEventPath(), plugin)
  expect(spyFn.mock.calls.length).toBe(0)
})

test('handlePlugin when eventPath match', () => {
  const plugin = { test: /a.js/, plugin: _plugin }
  plugins.handlePlugin(getEventPath(), plugin)
  expect(logSpy.mock.calls[0][0]).toMatch('S2S')
})

test('handlePlugin with input option', () => {
  const plugin = { test: /a.js/, plugin: _plugin, input: getEventPath() }
  plugins.handlePlugin(getEventPath(), plugin)
  expect(writeSpy.mock.calls[0][1]).toMatchSnapshot()
})

test('handlePlugin with output option', () => {
  const plugin = { test: /a.js/, plugin: _plugin, output: 'b.js' }
  plugins.handlePlugin(getEventPath(), plugin)
  expect(writeSpy.mock.calls[0][0]).toMatch('/fixtures/b.js')
})

test('handlePlugin write args', () => {
  const plugin = { test: /a.js/, plugin: _plugin }
  plugins.handlePlugin(getEventPath(), plugin)
  expect(writeSpy.mock.calls[0][0]).toBe(getEventPath())
  expect(writeSpy.mock.calls[0][1]).toMatchSnapshot()
})

test('handlePlugin when compileWithPlugin returns empty code', () => {
  const spy = jest.spyOn(utils, 'compile').mockReturnValue('')
  const plugin = { test: /a.js/, plugin: _plugin }
  plugins.handlePlugin(getEventPath(), plugin)
  expect(logSpy).not.toHaveBeenCalled()
  spy.mockRestore()
})

test('handlePlugins when locked', () => {
  lock.add(getEventPath())
  plugins.default(getEventPath(), [_plugin])
  expect(writeSpy).not.toHaveBeenCalled()
})

test('handlePlugins called write', () => {
  const opts = { test: /not-found.js/, plugin: _plugin }
  plugins.default(getEventPath(), [opts])
  expect(logSpy).not.toHaveBeenCalled()
})

test('handlePlugins handle error', () => {
  const plugin = { test: /a.js/, plugin: _plugin }
  logSpy.mockImplementation(() => {
    throw new Error('hello')
  })
  plugins.default(getEventPath(), [plugin])
  expect(errorSpy).toHaveBeenCalled()
})

test('handlePlugin when plugins = undefined', () => {
  plugins.default(getEventPath())
  expect(logSpy).not.toHaveBeenCalled()
})
