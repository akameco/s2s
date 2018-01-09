// @flow
import path from 'path'
import fs from 'fs'
import KeyLocker from 'key-locker'
import * as utils from '../utils'
import handlePlugins from '.'
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

test('eventPathがMatchしないとき、handlePluginは呼ばれない', () => {
  jest.mock('./handle-plugin')
  const { handlePlugin } = require('./handle-plugin') // eslint-disable-line global-require
  const plugin = { test: /hoge/, plugin: _plugin }
  const handlers = require('.').default // eslint-disable-line global-require
  handlers(getEventPath('a.js'), 'add', { plugins: [plugin] })
  // $FlowFixMe
  expect(handlePlugin.mock.calls).toHaveLength(0)
})

test('lockされているとき、ハンドラを実行しない', () => {
  lock.add(getEventPath('a.js'))
  handlePlugins(getEventPath('a.js'), 'add', {
    plugins: [{ test: /x.js/, plugin: _plugin }],
  })
  expect(writeSpy).not.toHaveBeenCalled()
})

test('testがマッチしないとき、ハンドラを実行しない', () => {
  const opts = { test: /not-found.js/, plugin: _plugin }
  handlePlugins(getEventPath('a.js'), 'add', { plugins: [opts] })
  expect(writeSpy).not.toHaveBeenCalled()
})

test('pluginsがundefinedのとき、ハンドラを実行しない', () => {
  handlePlugins(getEventPath('a.js'), 'add')
  expect(logSpy).not.toHaveBeenCalled()
})

test('onlyオプションがeventTypeと不一致のとき、hanlderを実行しない', () => {
  const plugin = { test: /a.js/, plugin: _plugin, only: ['unlink'] }
  handlePlugins(getEventPath('a.js'), 'add', { plugins: [plugin] })
  expect(writeSpy).not.toHaveBeenCalled()
})

test('同じイベントが続けて発生したとき、ロックが機能する', () => {
  const plugin = { test: /a.js/, plugin: _plugin }
  handlePlugins(getEventPath('a.js'), 'add', { plugins: [plugin] })
  handlePlugins(getEventPath('a.js'), 'add', { plugins: [plugin] })
  expect(logSpy).toHaveBeenCalledTimes(1)
})

test('handlerが渡されたとき、優先して呼ばれる', () => {
  const handler = jest.fn()
  const plugin = { test: /a.js/, plugin: _plugin, handler }
  handlePlugins(getEventPath('a.js'), 'add', { plugins: [plugin] })
  expect(handler).toBeCalled()
})

test('拡張子が.tsのとき、s2s-handler-typescriptを実行する', () => {
  const plugin = { test: /hello.ts/, plugin: _plugin }
  handlePlugins(getEventPath('hello.ts'), 'add', {
    plugins: [plugin],
  })
  // expect(writeSpy.mock.calls).toEqual({})
  expect(writeSpy.mock.calls[0][1]).toMatchSnapshot()
})

test('エラーが起きたとき、エラーメッセージを表示する', () => {
  const plugin = { test: /a.js/, plugin: _plugin }
  logSpy.mockImplementation(() => {
    throw new Error('hello')
  })
  handlePlugins(getEventPath('a.js'), 'add', { plugins: [plugin] })
  expect(errorSpy).toHaveBeenCalled()
})

test('対象のファイルが存在しない場合、簡潔なエラーを表示する', () => {
  const testPlugin = () => {
    fs.readFileSync('./not-found')
    return {
      name: 'test-plugin',
      visitor: {},
    }
  }
  const plugin = { test: /a.js/, plugin: testPlugin }
  handlePlugins(getEventPath('a.js'), 'add', { plugins: [plugin] })
  expect(errorSpy.mock.calls[0][0]).toMatch('ENOENT')
})

describe('testオプション', () => {
  test('globを判定できる', () => {
    handlePlugins(getEventPath('a.js'), 'add', {
      plugins: [{ test: '**/*.js', plugin: _plugin }],
    })
    expect(writeSpy).toHaveBeenCalled()
  })

  test('globの配列を判定できる', () => {
    handlePlugins(getEventPath('a.js'), 'add', {
      plugins: [{ test: ['**/*.js', '!**/b'], plugin: _plugin }],
    })
    expect(writeSpy).toHaveBeenCalled()
  })
})
