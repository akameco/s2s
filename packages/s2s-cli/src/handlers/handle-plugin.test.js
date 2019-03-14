// @flow
import path from 'path'
import stripAnsi from 'strip-ansi'
import * as babel from 'babel-core'
import defaultHandler from 's2s-handler-babel'
import * as utils from '../utils'
import { handlePlugin } from './handle-plugin'
import _plugin from './__tests__/helpers/identifer-reverse-plugin'

const getEventPath = (...p) =>
  path.resolve(__dirname, '__tests__', 'fixtures', ...p)

const setup = plugin => {
  return [
    defaultHandler,
    {
      eventPath: getEventPath('a.js'),
      plugin,
      hooks: [],
    },
  ]
}

let errorSpy
let logSpy
let writeSpy

const fn = x => x

jest.useFakeTimers()

beforeEach(() => {
  jest.runAllTimers()
  errorSpy = jest.spyOn(console, 'error').mockImplementation(fn)
  logSpy = jest.spyOn(console, 'log').mockImplementation(fn)
  writeSpy = jest.spyOn(utils, 'writeFileSync').mockImplementation(fn)
})

afterEach(() => {
  errorSpy.mockRestore()
  logSpy.mockRestore()
  writeSpy.mockRestore()
})

test('handlePlugin when eventPath match', () => {
  const plugin = { test: /a.js/, plugin: _plugin }
  handlePlugin(...setup(plugin))
  expect(stripAnsi(logSpy.mock.calls[0][0])).toMatchSnapshot()
})

test('pluginNameが与えられたとき、それを表示する', () => {
  const plugin = { test: /a.js/, plugin: 'syntax-flow' }
  handlePlugin(...setup(plugin))
  expect(stripAnsi(logSpy.mock.calls[0][0])).toMatchSnapshot()
})

test('Codeを返す旧ハンドラーの場合はS2Sと表示させる', () => {
  const plugin = { test: /a.js/, plugin: 'syntax-flow' }
  const handler = x => x
  // $FlowFixMe
  handlePlugin(handler, setup(plugin)[1])
  expect(stripAnsi(logSpy.mock.calls[0][0])).toMatchSnapshot()
})

test('with input option', () => {
  const plugin = { test: /a.js/, plugin: _plugin, input: getEventPath('a.js') }
  handlePlugin(...setup(plugin))
  expect(writeSpy.mock.calls[0][1]).toMatchSnapshot()
})

test('with relative input path', () => {
  const plugin = { test: /a.js/, plugin: _plugin, input: 'b.js' }
  handlePlugin(...setup(plugin))
  expect(writeSpy.mock.calls[0][1]).toMatchSnapshot()
})

test('with output option', () => {
  const plugin = { test: /a.js/, plugin: _plugin, output: 'b.js' }
  handlePlugin(...setup(plugin))
  expect(writeSpy.mock.calls[0][0]).toMatch('/fixtures/b.js')
})

test('when output option is [name].test.js', () => {
  const plugin = { test: /a.js/, plugin: _plugin, output: '[name].test.js' }
  handlePlugin(...setup(plugin))
  expect(writeSpy.mock.calls[0][0]).toMatch('/fixtures/a.test.js')
})

test('write args', () => {
  const plugin = { test: /a.js/, plugin: _plugin }
  handlePlugin(...setup(plugin))
  expect(writeSpy.mock.calls[0][0]).toBe(getEventPath('a.js'))
  expect(writeSpy.mock.calls[0][1]).toMatchSnapshot()
})

test('when compileWithPlugin returns empty code', () => {
  const spy = jest.spyOn(babel, 'transform').mockReturnValue('')
  const plugin = { test: /a.js/, plugin: _plugin }
  handlePlugin(...setup(plugin))
  expect(logSpy).not.toHaveBeenCalled()
  spy.mockRestore()
})

test('call write handlePlugin when only === add', () => {
  const plugin = { test: /a.js/, plugin: _plugin, only: ['add'] }
  handlePlugin(...setup(plugin))
  expect(writeSpy).toHaveBeenCalled()
})

test('hooksが渡されない場合', () => {
  const plugin = { test: /a.js/, plugin: _plugin }
  const opts = setup(plugin)
  delete opts[1].hooks
  handlePlugin(opts[0], { ...opts[1] })
  expect(writeSpy).toHaveBeenCalled()
})

test('hookに渡されるパスはoutput', () => {
  const input = getEventPath('a.js')
  const output = getEventPath('b.js')
  const plugin = { test: /a.js/, plugin: _plugin, input, output }
  const opts = setup(plugin)
  const mockHook = jest.fn(code => code)
  opts[1].hooks = [mockHook]
  handlePlugin(...opts)
  expect(mockHook).toHaveBeenCalled()
  expect(mockHook.mock.calls[0][1]).toBe(output)
})
