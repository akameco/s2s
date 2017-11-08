// @flow
import path from 'path'
import loadConfig from './loadConfig'

const getFixturePath = (...p) =>
  path.join(__dirname, '__tests__', 'fixtures', ...p)

const origCwd = process.cwd

const setCwd = alt => {
  // $FlowFixMe
  process.cwd = alt
}

afterEach(() => {
  setCwd(origCwd)
})

test('load cjs config', () => {
  const x = loadConfig(getFixturePath('cjs'))
  expect(x).toHaveProperty('watch')
})

test('use process.cwd() when no args', () => {
  setCwd(() => getFixturePath('cjs'))
  const x = loadConfig()
  expect(x).toHaveProperty('watch')
})

test('throw error', () => {
  expect(() => {
    loadConfig(getFixturePath('missing path'))
  }).toThrow('required s2s.config.js')
})
