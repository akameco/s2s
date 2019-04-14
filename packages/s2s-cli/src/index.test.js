// @flow
import cases from 'jest-in-case'
import type { Config } from 'types'
import * as plugins from './handlers'
import * as templates from './templates'
import m from '.'

let logSpy
let handlePluginsSpy
let handleTemplateSpy
let watcher

function setup(options = {}): Config {
  return {
    watch: 'app',
    plugins: [{ test: /dummy/, plugin: 'dummy' }],
    templates: [{ test: /dummy/, input: 'dummy' }],
    ...options,
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
  options => {
    expect(() => {
      m(setup(options.input))
    }).toThrowErrorMatchingSnapshot()
  },
  [
    // $FlowFixMe
    { name: 'opts.watch == null', input: { watch: null } },
    // $FlowFixMe
    { name: 'opts.plugins !== Array', input: { plugins: 'not array' } },
    // $FlowFixMe
    { name: 'opts.templates !== Array', input: { templates: 'string' } },
    { name: 'opts.after !== Array', input: { afterHooks: 'string' } },
  ]
)

test('Displayed "start" on the Consle', () => {
  watcher = m(setup())
  expect(logSpy.mock.calls).toHaveLength(1)
  expect(logSpy.mock.calls[0][0]).toMatch('start')
})

test('pluginsとtemplatesが渡されないとき', () => {
  const options = setup()
  delete options.plugins
  delete options.templates
  watcher = m(options)
  expect(logSpy.mock.calls).toHaveLength(1)
  expect(logSpy.mock.calls[0][0]).toMatch('start')
})

test('ファイルが追加されたときhandlePluginsが呼ばれる', () => {
  watcher = m(setup())
  watcher.emit('add', 'hello')
  const result = handlePluginsSpy.mock.calls[0]
  expect(result[0]).toBe('hello')
  expect(result[1]).toBe('add')
  expect(result[2]).toMatchSnapshot()
})

test('pluginsがない場合、ファイルが追加されたときhandlePluginsは呼ばれない', () => {
  watcher = m(setup({ plugins: [] }))
  watcher.emit('add', 'hello')
  expect(handlePluginsSpy).not.toHaveBeenCalled()
})

test('ファイルが追加されたときhandleTemplatesが呼ばれる', () => {
  watcher = m(setup())
  watcher.emit('add', 'hello')
  const result = handleTemplateSpy.mock.calls[0]
  expect(result).toMatchInlineSnapshot(`
    Array [
      "hello",
      Array [
        Object {
          "input": "dummy",
          "test": /dummy/,
        },
      ],
      undefined,
    ]
  `)
})

test('templatesがない場合、ファイルが追加されたときhandleTemplatesは呼ばれない', () => {
  watcher = m(setup({ templates: [] }))
  watcher.emit('add', 'hello')
  expect(handleTemplateSpy).not.toHaveBeenCalled()
})

test('prettier = falseのとき、 afterHooksが空配列でhandlePluginが呼ばれる', () => {
  watcher = m(setup({ prettier: false }))
  watcher.emit('add', 'hello')
  const result = handlePluginsSpy.mock.calls[0]
  expect(result[2].afterHooks).toStrictEqual([])
})

test('ignoredに指定されたパターンに該当するファイルは、呼ばれない', () => {
  watcher = m(setup({ ignored: ['hoge'] }))
  expect(watcher.options.ignored).toStrictEqual(['hoge'])
})
