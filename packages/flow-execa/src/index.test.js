// @flow
import path from 'path'
import {
  getFlowBin,
  versionInfo,
  typeAtPos,
  getTypeFromFile,
  getTypeFromFileSync,
} from '.'

const getFixturePath = (...x) => path.resolve(__dirname, '__fixtures__', ...x)

let cwd
let filePath
const pos = [11, 7]

beforeEach(() => {
  cwd = process.cwd()
  filePath = getFixturePath('basic.js')
})

test('getFlowBinはflowのバイナリを返す', () => {
  expect(getFlowBin('/')).toBe('/node_modules/.bin/flow')
})

test('getVersionInfoはflowのバージョン情報のオブジェクトを返す', async () => {
  const info = await versionInfo(cwd)
  expect(info).toHaveProperty('semver')
})

test('getVersionInfoはpathが見つからない場合にnullを返す', async () => {
  cwd = 'not-found'
  const info = await versionInfo(cwd)
  expect(info).toBe(null)
})

test('getTypeAtPosがflowの型情報のオブジェクトを返す', async () => {
  const info = await typeAtPos(cwd, filePath, ...pos)
  expect(info).toHaveProperty('type')
})

test('getTypeFromFileはflowの型情報の文字列を返す', async () => {
  const t = await getTypeFromFile(cwd, filePath, ...pos)
  expect(t).toBe('{age: ?number, id: number, name: string, sex?: string}')
})

test('getTypeFromFileSyncはflowの型情報の文字列を返す', () => {
  const t = getTypeFromFileSync(cwd, filePath, ...pos)
  expect(t).toBe('{age: ?number, id: number, name: string, sex?: string}')
})

test('getTypeFromFileはcwdがnullのときnullを返す', async () => {
  const t = await getTypeFromFile('not-found', filePath, ...pos)
  expect(t).toBe(null)
})
