// @flow
import handler from '.'
import plugin from './__tests__/helpers/plugin'

const code = 'const hello = "hello"'

const setup = (plug = plugin) => {
  return {
    eventPath: '/path/to/fixture/code.js',
    filename: 'dummy.js',
    plugin: { test: /dummy/, plugin: plug },
  }
}

test('handlerは変換後のコードを返す', () => {
  const result = handler(code, setup())
  expect(result.code).toMatchSnapshot()
})

test('pluginがArrayの場合、変換後のCodeを返す', () => {
  const result = handler(code, setup([plugin, { x: 1 }]))
  expect(result.code).toMatchSnapshot()
})

test('codeが""の場合、""が返ること', () => {
  const result = handler('', setup())
  expect(result.code).toStrictEqual('')
})

test('pluginが渡されない場合、エラーを起こすこと', () => {
  const opts = setup()
  delete opts.plugin
  expect(() => {
    handler(code, opts)
  }).toThrow('required plugin')
})

test('metaデータを返す', () => {
  const result = handler(code, setup('syntax-flow'))
  expect(result).toMatchSnapshot()
})

test('pluginが関数の場合、pluginNameを返す', () => {
  const result = handler(code, setup())
  expect(result.meta.pluginName).toBe('from-plugin')
})

test('pluginが関数かつnameプロパティがない場合、""を返す', () => {
  const noop = () => ({ visitor: {} })
  const result = handler(code, setup(noop))
  expect(result.meta.pluginName).toBe('')
})
