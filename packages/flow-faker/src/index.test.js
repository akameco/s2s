// @flow
import path from 'path'
import flowFaker, {
  flowFakerSync,
  getTypeAst,
  astToObj,
  createInitialStateFromTypeInfo,
} from '.'

jest.setTimeout(20000)

const getFixturePath = (...x) => path.resolve(__dirname, '__fixtures__', ...x)

const pos = { row: 20, column: 7 }

test('型情報からオブジェクトを初期化する', () => {
  const output = createInitialStateFromTypeInfo({
    id: 'number',
    name: 'string',
  })
  expect(output).toEqual({ id: 0, name: '' })
})

test('flowFakerはcwdがnullのとき、{}を返す', async () => {
  const filePath = getFixturePath('basic.js')
  const result = await flowFaker(filePath, { ...pos, cwd: 'not-found' })
  expect(result).toEqual({})
})

test('ファイルとポジションを受け取り、その型を初期化したオブジェクトを返す', async () => {
  const filePath = getFixturePath('basic.js')
  const result = await flowFaker(filePath, pos)
  expect(result).toEqual({
    isOk: false,
    union: null,
    user: { id: 0, name: '', age: null },
    users: [],
  })
})

test('sync: ファイルとポジションを受け取り、その型を初期化したオブジェクトを返す', () => {
  const filePath = getFixturePath('basic.js')
  const result = flowFakerSync(filePath, pos)
  expect(result).toEqual({
    isOk: false,
    union: null,
    user: { id: 0, name: '', age: null },
    users: [],
  })
})

test('ジェネリックタイプかつパラメータがない場合nullを返す', async () => {
  const filePath = getFixturePath('basic.js')
  const result = await flowFaker(filePath, { row: 27, column: 5 })
  expect(result).toEqual(null)
})

test('astToObjにnodeではないオブジェクトを渡したときnullを返す', () => {
  expect(astToObj({ node: {} })).toBe(null)
})

function astTest(title: string, input: string, expected: *) {
  test(title, () => {
    const ast = getTypeAst(input)
    const output = astToObj(ast)
    expect(output).toEqual(expected)
  })
}

describe('ASTをjsのオブジェクトに変換する', () => {
  astTest('number型のとき文字列numberを返す', 'number', 'number')
  astTest('string型のとき文字列stringを返す', 'string', 'string')
  astTest('boolean型のとき文字列booleanを返す', 'boolean', 'boolean')
  astTest('nullを許容する場合nullを返す', '?string', null)
  astTest(
    'Unionの場合はUnionTypeAnnotationを返す',
    'string | number',
    'UnionTypeAnnotation'
  )

  describe('ObjectTypeProperty型のときプロパティを型に変換されたオブジェクトを返す', () => {
    astTest('空オブジェクト型のとき空のオブジェクトを返す', '{}', {})
    astTest('{name: string}', '{name: string}', { name: 'string' })

    astTest('{id: number, name: string}', '{id: number, name: string}', {
      name: 'string',
      id: 'number',
    })

    astTest('nullableな型の場合nullを返す', '{age: ?number}', { age: null })

    astTest(
      'オプショナルな型の場合{}を返す {age?: number}',
      '{age?: number}',
      {}
    )

    astTest(
      'ネストした型の場合、ネストしたオブジェクトを返す',
      '{user: {id: number, name: string} }',
      {
        user: { id: 'number', name: 'string' },
      }
    )
  })

  describe('ArrayTypeAnnotation型のとき配列を返す', () => {
    astTest('空配列のとき', 'string[]', [])

    astTest('中身がオブジェクトのとき', 'Array<{id: number, name: string}>', [
      { id: 'number', name: 'string' },
    ])
  })

  describe('FlowUtilの型の場合', () => {
    astTest('$Shape<{}>', '$Shape<{id: number, name: string}>', [
      { id: 'number', name: 'string' },
    ])
  })
})
