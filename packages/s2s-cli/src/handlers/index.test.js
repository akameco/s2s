// @flow
import path from 'path'
import stripAnsi from 'strip-ansi'
import KeyLocker from 'key-locker'
import * as babel from 'babel-core'
import defaultHandler from 's2s-handler-babel'
import * as utils from '../utils'
import * as plugins from '.'
import _plugin from './__tests__/helpers/identifer-reverse-plugin'

let errorSpy
let logSpy
let writeSpy

const lock = new KeyLocker()

const fn = x => x

const getEventPath = (...p) =>
  path.resolve(__dirname, '__tests__', 'fixtures', ...p)

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

test('eventPathがMatchしないとき、handlePluginを呼ばない', () => {
  const spyFn = jest.spyOn(plugins, 'handlePlugin')
  const plugin = { test: /hoge/, plugin: _plugin }
  plugins.default(getEventPath('a.js'), 'add', { plugins: [plugin] })
  expect(spyFn.mock.calls.length).toBe(0)
})

test('handlePlugin when eventPath match', () => {
  const plugin = { test: /a.js/, plugin: _plugin }
  plugins.handlePlugin(...setup(plugin))
  expect(stripAnsi(logSpy.mock.calls[0][0])).toMatchSnapshot()
})

test('handlePlugin pluginNameが与えられたとき、それを表示する', () => {
  const plugin = { test: /a.js/, plugin: 'syntax-flow' }
  plugins.handlePlugin(...setup(plugin))
  expect(stripAnsi(logSpy.mock.calls[0][0])).toMatchSnapshot()
})

test('handlePlugin with input option', () => {
  const plugin = { test: /a.js/, plugin: _plugin, input: getEventPath('a.js') }
  plugins.handlePlugin(...setup(plugin))
  expect(writeSpy.mock.calls[0][1]).toMatchSnapshot()
})

test('handlePlugin with relative input path', () => {
  const plugin = { test: /a.js/, plugin: _plugin, input: 'b.js' }
  plugins.handlePlugin(...setup(plugin))
  expect(writeSpy.mock.calls[0][1]).toMatchSnapshot()
})

test('handlePlugin with output option', () => {
  const plugin = { test: /a.js/, plugin: _plugin, output: 'b.js' }
  plugins.handlePlugin(...setup(plugin))
  expect(writeSpy.mock.calls[0][0]).toMatch('/fixtures/b.js')
})

test('handlePlugin when output option is [name].test.js', () => {
  const plugin = { test: /a.js/, plugin: _plugin, output: '[name].test.js' }
  plugins.handlePlugin(...setup(plugin))
  expect(writeSpy.mock.calls[0][0]).toMatch('/fixtures/a.test.js')
})

test('handlePlugin write args', () => {
  const plugin = { test: /a.js/, plugin: _plugin }
  plugins.handlePlugin(...setup(plugin))
  expect(writeSpy.mock.calls[0][0]).toBe(getEventPath('a.js'))
  expect(writeSpy.mock.calls[0][1]).toMatchSnapshot()
})

test('handlePlugin when compileWithPlugin returns empty code', () => {
  const spy = jest.spyOn(babel, 'transform').mockReturnValue('')
  const plugin = { test: /a.js/, plugin: _plugin }
  plugins.handlePlugin(...setup(plugin))
  expect(logSpy).not.toHaveBeenCalled()
  spy.mockRestore()
})

test('handlePlugins when locked', () => {
  lock.add(getEventPath('a.js'))
  plugins.default(getEventPath('a.js'), 'add', {
    plugins: [{ test: /x.js/, plugin: _plugin }],
  })
  expect(writeSpy).not.toHaveBeenCalled()
})

test('handlePlugins called write', () => {
  const opts = { test: /not-found.js/, plugin: _plugin }
  plugins.default(getEventPath('a.js'), 'add', { plugins: [opts] })
  expect(logSpy).not.toHaveBeenCalled()
})

test('handlePlugins handle error', () => {
  const plugin = { test: /a.js/, plugin: _plugin }
  logSpy.mockImplementation(() => {
    throw new Error('hello')
  })
  plugins.default(getEventPath('a.js'), 'add', { plugins: [plugin] })
  expect(errorSpy).toHaveBeenCalled()
})

test('handlePlugin when plugins = undefined', () => {
  plugins.default(getEventPath('a.js'), 'add')
  expect(logSpy).not.toHaveBeenCalled()
})

test('call write handlePlugin when only === add', () => {
  const plugin = { test: /a.js/, plugin: _plugin, only: ['add'] }
  plugins.handlePlugin(...setup(plugin))
  expect(writeSpy).toHaveBeenCalled()
})

test('onlyオプションがeventTypeと不一致のとき、hanlderを呼ばない', () => {
  const plugin = { test: /a.js/, plugin: _plugin, only: ['unlink'] }
  plugins.default(getEventPath('a.js'), 'add', { plugins: [plugin] })
  expect(writeSpy).not.toHaveBeenCalled()
})

test('lockが機能しているか', () => {
  const plugin = { test: /a.js/, plugin: _plugin }
  plugins.default(getEventPath('a.js'), 'add', { plugins: [plugin] })
  plugins.default(getEventPath('a.js'), 'add', { plugins: [plugin] })
  expect(logSpy).toHaveBeenCalledTimes(1)
})

test('カスタムhandlerが呼ばれるか', () => {
  const handler = jest.fn()
  const plugin = { test: /a.js/, plugin: _plugin, handler }
  plugins.default(getEventPath('a.js'), 'add', { plugins: [plugin] })
  expect(handler).toBeCalled()
})

test('hooksが渡されない場合', () => {
  const plugin = { test: /a.js/, plugin: _plugin }
  const opts = setup(plugin)
  delete opts[1].hooks
  plugins.handlePlugin(opts[0], { ...opts[1] })
  expect(writeSpy).toBeCalled()
})

test('use s2s-handler-typescript when extname of eventPath is .ts', () => {
  const plugin = { test: /hello.ts/, plugin: _plugin }
  plugins.default(getEventPath('hello.ts'), 'add', {
    plugins: [plugin],
  })
  // expect(writeSpy.mock.calls).toEqual({})
  expect(writeSpy.mock.calls[0][1]).toMatchSnapshot()
})

test('handlePluginsのPlugin.testオプションはglobを判定できる', () => {
  plugins.default(getEventPath('a.js'), 'add', {
    plugins: [{ test: '**/*.js', plugin: _plugin }],
  })
  expect(writeSpy).toHaveBeenCalled()
})

test('handlePluginsのPlugin.testオプションはglobの配列を判定できる', () => {
  plugins.default(getEventPath('a.js'), 'add', {
    plugins: [{ test: ['**/*.js', '!**/b'], plugin: _plugin }],
  })
  expect(writeSpy).toHaveBeenCalled()
})

describe('selectHandler', () => {
  test('ハンドラが渡された場合、そのハンドラを返す', () => {
    const handler = x => ({ code: x, meta: { handlerName: 'x' } })
    expect(plugins.selectHandler({}, handler, 'a.ejs').name).toEqual('handler')
  })

  test('任意のハンドラーを渡すことができる', () => {
    const testHandler = () => ({
      code: 'test',
      meta: { handlerName: 'testHandler' },
    })
    const receivedHandler = plugins.selectHandler(
      { '*.ejs': testHandler },
      undefined,
      'path/to/index.ejs'
    )
    // $FlowFixMe
    expect(receivedHandler('', {}).code).toBe('test')
  })

  test('デフォルトのハンドラより渡されたハンドラを優先する', () => {
    const testHandler = () => ({
      code: 'test',
      meta: { handlerName: 'testHandler' },
    })
    const receivedHandler = plugins.selectHandler(
      { '*.js': testHandler },
      undefined,
      'path/to/index.js'
    )
    // $FlowFixMe
    expect(receivedHandler('', {}).code).toBe('test')
  })

  test('ハンドラがマッチしない場合、エラーを起こす', () => {
    expect(() => {
      plugins.selectHandler({}, undefined, 'a.ejs')
    }).toThrow('any handlers not match')
  })
})
