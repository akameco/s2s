// @flow
import path from 'path'
import {
  getFlowBin,
  versionInfo,
  typeAtPos,
  typeAtPosSync,
  getTypeFromFile,
  getTypeFromFileSync,
} from '.'

const getFixturePath = (...x) => path.resolve(__dirname, '__fixtures__', ...x)

let cwd
let filePath
const platform = process.platform
const pos = [11, 7]

beforeEach(() => {
  cwd = process.cwd()
  filePath = getFixturePath('basic.js')
})

afterEach(() => {
  process.platform = platform
})

if (process.platform === 'win32') {
  test('win32: win32のときgetFlowBinはflow.exeのバイナリのパスを返す', () => {
    process.platform = 'win32'
    expect(getFlowBin('/')).toBe('C:\\node_modules\\.bin\\flow.exe')
  })
} else {
  test('unixのときgetFlowBinはflowのバイナリのパスを返す', () => {
    process.platform = 'darwin'
    expect(getFlowBin('/')).toBe('/node_modules/.bin/flow')
  })

  test('win32のときgetFlowBinはflow.exeのバイナリのパスを返す', () => {
    process.platform = 'win32'
    expect(getFlowBin('/')).toBe('/node_modules/.bin/flow.exe')
  })
}

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

test('typeAtPosSyncはtypeプロパティを持つオブジェクトを返す', () => {
  const info = typeAtPosSync(cwd, filePath, ...pos)
  expect(info).toHaveProperty('type')
})

test('typeAtPosSync: patが見つからないのとき空オブジェクトを返す', () => {
  const info = typeAtPosSync('not-found', filePath, ...pos)
  expect(info).toEqual({})
})

test('getTypeFromFileはflowの型情報の文字列を返す', async () => {
  const t = await getTypeFromFile(cwd, filePath, ...pos)
  expect(t).toMatchSnapshot()
})

test('getTypeFromFileはcwdがnullのときnullを返す', async () => {
  const t = await getTypeFromFile('not-found', filePath, ...pos)
  expect(t).toBe(null)
})

test('getTypeFromFileSyncはflowの型情報の文字列を返す', () => {
  const t = getTypeFromFileSync(cwd, filePath, ...pos)
  expect(t).toMatchSnapshot()
})

test('getTypeFromFileSyncはcwdがnullのときnullを返す', () => {
  const t = getTypeFromFileSync('not-found', filePath, ...pos)
  expect(t).toBe(null)
})
