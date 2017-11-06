// @flow
import cases from 'jest-in-case'
import type { Opts } from 'types'
import * as plugins from './handlers/plugins'
import * as templates from './handlers/templates'
import m from '.'

let logSpy
let handlePluginsSpy
let handleTemplateSpy
let watcher

function setup(opts: $Shape<Opts>) {
  return {
    watch: 'app',
    plugins: [{ test: /dummy/, plugin: 'dummy' }],
    templates: [{ test: /dummy/, input: 'dummy' }],
    ...opts,
  }
}

beforeEach(() => {
  logSpy = jest.spyOn(console, 'log').mockImplementation(x => x)
  handlePluginsSpy = jest.spyOn(plugins, 'default')
  handleTemplateSpy = jest.spyOn(templates, 'default')
})

afterEach(() => {
  logSpy.mockRestore()
  handlePluginsSpy.mockRestore()
  handleTemplateSpy.mockRestore()
  if (watcher && watcher.close) {
    watcher.close()
  }
})

cases(
  'throw errors',
  opts => {
    expect(() => {
      m(setup(opts.input))
    }).toThrowErrorMatchingSnapshot()
  },
  [
    // $FlowFixMe
    { name: 'opts.watch == null', input: { watch: null } },
    // $FlowFixMe
    { name: 'opts.plugins !== Array', input: { plugins: 'not array' } },
    // $FlowFixMe
    { name: 'opts.templates !== Array', input: { templates: 'string' } },
    // $FlowFixMe
    { name: 'opts.after !== Array', input: { afterHooks: 'string' } },
  ]
)

test('Displayed "start" on the Consle', () => {
  watcher = m(setup())
  expect(logSpy.mock.calls.length).toBe(1)
  expect(logSpy.mock.calls[0][0]).toMatch('start')
})

test('ファイルが追加されたときhandlePluginsが呼ばれる', () => {
  watcher = m(setup())
  watcher.emit('add', 'hello')
  const result = handlePluginsSpy.mock.calls[0]
  expect(result[0]).toBe('hello')
  expect(result[1]).toBe('add')
  expect(result[2]).toEqual([{ plugin: 'dummy', test: /dummy/ }])
})

test('pluginsがない場合、ファイルが追加されたときhandlePluginsは呼ばれない', () => {
  watcher = m(setup({ plugins: [] }))
  watcher.emit('add', 'hello')
  expect(handlePluginsSpy).not.toBeCalled()
})

test('ファイルが追加されたときhandleTemplatesが呼ばれる', () => {
  watcher = m(setup())
  watcher.emit('add', 'hello')
  const result = handleTemplateSpy.mock.calls[0]
  const expected = ['hello', [{ input: 'dummy', test: /dummy/ }], undefined]
  expect(result).toEqual(expected)
})

test('templatesがない場合、ファイルが追加されたときhandleTemplatesは呼ばれない', () => {
  watcher = m(setup({ templates: [] }))
  watcher.emit('add', 'hello')
  expect(handleTemplateSpy).not.toBeCalled()
})

test('when prettier = false', () => {
  watcher = m(setup({ prettier: false }))
  watcher.emit('add', 'hello')
  const result = handlePluginsSpy.mock.calls[0]
  expect(result[3]).toEqual([])
})
