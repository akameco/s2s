// @flow
import handler from '../babel-handler'
import _plugin from './helpers/identifer-reverse-plugin'
import fromPlugin from './helpers/from-plugin'

const code = 'const hello = "hello"'

const plugin = {
  plugin: _plugin,
  test: /dummy/,
}

const opts = {
  eventPath: '/path/to/code.js',
  filename: 'dummy.js',
  plugin,
}

test('babel-handlerは変換後のコードを返す', () => {
  const result = handler(code, opts)
  expect(result).toMatchSnapshot()
})

test('pluginがArrayの場合', () => {
  const result = handler(code, {
    ...opts,
    plugin: { ...plugin, plugin: [_plugin, { x: 1 }] },
  })
  expect(result).toMatchSnapshot()
})

test('fromオプションを使う場合', () => {
  const result = handler(code, {
    ...opts,
    plugin: { ...plugin, plugin: fromPlugin },
  })
  expect(result).toMatchSnapshot()
})
