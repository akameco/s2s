// @flow
import { selectHandler } from './select-handler'

test('ハンドラが渡された場合、そのハンドラを返す', () => {
  const handler = x => ({ code: x, meta: { handlerName: 'x' } })
  expect(selectHandler({}, handler, 'a.ejs').name).toEqual('handler')
})

test('任意のハンドラーを渡すことができる', () => {
  const testHandler = () => ({
    code: 'test',
    meta: { handlerName: 'testHandler' },
  })
  const receivedHandler = selectHandler(
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
  const receivedHandler = selectHandler(
    { '*.(js|jsx)': testHandler },
    undefined,
    'path/to/index.js'
  )
  // $FlowFixMe
  expect(receivedHandler('', {}).code).toBe('test')
})

test('ハンドラがマッチしない場合、エラーを起こす', () => {
  expect(() => {
    selectHandler({}, undefined, 'a.ejs')
  }).toThrow('any handlers not match')
})
