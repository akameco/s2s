// @flow
import path from 'path'
import * as utils from '../../utils'
import lock from '../../utils/lock'
import * as plugins from '../plugins'
import _plugin from './helpers/identifer-reverse-plugin'

let writeSpy
let logSpy

const fn = x => x

beforeEach(() => {
  logSpy = jest.spyOn(utils, 'log').mockImplementation(fn)
  writeSpy = jest.spyOn(utils, 'write').mockImplementation(fn)
})

afterEach(() => {
  logSpy.mockRestore()
  writeSpy.mockRestore()
})

test('compileWithPlugin', () => {
  const inputPath = path.resolve(__dirname, 'fixtures', 'a.js')
  const result = plugins.compileWithPlugin(inputPath, _plugin)
  expect(result).toMatchSnapshot()
})

test('handlePlugin when eventPath not match', () => {
  const spyFn = jest.spyOn(plugins, 'compileWithPlugin')
  const inputPath = path.resolve(__dirname, 'fixtures', 'a.js')
  const plugin = { test: /hoge/, plugin: _plugin }
  plugins.handlePlugin(inputPath, plugin)
  expect(spyFn.mock.calls.length).toBe(0)
})

test('handlePlugin when eventPath match', () => {
  const inputPath = path.resolve(__dirname, 'fixtures', 'a.js')
  const plugin = { test: /a.js/, plugin: _plugin }
  plugins.handlePlugin(inputPath, plugin)
  expect(logSpy.mock.calls[0][0]).toMatch('S2S')
})

test('handlePlugin write args', () => {
  const inputPath = path.resolve(__dirname, 'fixtures', 'a.js')
  const plugin = { test: /a.js/, plugin: _plugin }
  plugins.handlePlugin(inputPath, plugin)
  expect(writeSpy.mock.calls[0][0]).toBe(inputPath)
  expect(writeSpy.mock.calls[0][1]).toMatchSnapshot()
})

test('handlePlugins when locked', () => {
  const inputPath = path.resolve(__dirname, 'fixtures', 'a.js')
  lock.add(inputPath)
  plugins.default(inputPath, [_plugin])
  expect(writeSpy).not.toHaveBeenCalled()
})

test('handlePlugins called write', () => {
  const inputPath = path.resolve(__dirname, 'fixtures', 'a.js')
  const opts = {
    test: /not-found.js/,
    plugin: _plugin,
  }
  plugins.default(inputPath, [opts])
  expect(logSpy).not.toHaveBeenCalled()
})
