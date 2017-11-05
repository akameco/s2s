// @flow
import handler from '.'
import _plugin from './__tests__/helpers/identifer-reverse-plugin'
import fromPlugin from './__tests__/helpers/from-plugin'

const code = `
function greeter(person: string) {
  return "Hello, " + person;
}

let user = "Jane User";
greeter(user);
`

const plugin = {
  plugin: _plugin,
  test: /dummy/,
}

const opts = {
  eventPath: '/path/to/code.js',
  filename: 'dummy.js',
  plugin,
}

test('ts-handlerは変換後のコードを返す', () => {
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
