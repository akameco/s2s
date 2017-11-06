// @flow
import handler from '.'
import plugin from './__tests__/helpers/plugin'

const setup = (plug = plugin) => {
  return {
    eventPath: '/path/to/fixture/code.js',
    filename: 'dummy.js',
    plugin: { test: /dummy/, plugin: plug },
  }
}

const code = `
function greeter(person: string) {
  return "Hello, " + person;
}

let user = "Jane User";
greeter(user);
`

test('ts-handlerは変換後のコードを返す', () => {
  const result = handler(code, setup())
  expect(result).toMatchSnapshot()
})

test('pluginがArrayの場合', () => {
  const result = handler(code, setup([plugin, { x: 1 }]))
  expect(result).toMatchSnapshot()
})

test('codeが""の場合、""が返ること', () => {
  const result = handler('', setup())
  expect(result).toBe('')
})
