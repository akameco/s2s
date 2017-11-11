// @flow
import generate from 'babel-generator'
import * as utils from '.'

test('getImportPath same folder', () => {
  const result = utils.getImportPath('path/to/index.js', 'path/to/test.js')
  expect(result).toBe('./test')
})

test('getImportPath same folder when not ext', () => {
  const result = utils.getImportPath('path/to/index', 'path/to/test')
  expect(result).toBe('./test')
})

test('getImportPath parent folder', () => {
  const result = utils.getImportPath('path/to/nest/index.js', 'path/to/test.js')
  expect(result).toBe('../test')
})

test('template', () => {
  const ast = utils.template(`type Action = A`)()
  expect(ast).toMatchSnapshot()
})

test('inheritsOpts', () => {
  const parserOpts = { plugins: [] }
  utils.inheritsOpts().manipulateOptions({}, parserOpts)
  expect(parserOpts).toEqual({ plugins: ['flow', 'objectRestSpread'] })
})

test('return parent path name', () => {
  expect(utils.getParentDirName('ok/hello/world')).toBe('hello')
})

testAst([
  {
    title: 'snapshot createImportDeclaration when string array',
    ast: utils.createImportDeclaration(['local1', 'local2'], './source'),
  },
  {
    title: 'snapshot createImportDeclaration when string',
    ast: utils.createImportDeclaration('local', './source'),
  },
  {
    title: 'snapshot typeImport',
    ast: utils.typeImport('local', 'imported', 'source'),
  },
  {
    title: 'snapshot defaultImport',
    ast: utils.defaultImport('defaultlocal', 'source'),
  },
])

function testAst(tests: Array<{ title: string, ast: * }>) {
  for (const { title, ast } of tests) {
    test(title, () => {
      const { code } = generate(ast)
      expect(code).toMatchSnapshot(title)
    })
  }
}
