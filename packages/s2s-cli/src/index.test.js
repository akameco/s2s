// @flow
import type { Opts } from 'types'
import m from '.'

let logSpy
const watchers = []

beforeEach(() => {
  logSpy = jest.spyOn(console, 'log')
  logSpy.mockImplementation(x => x)
})

afterEach(() => {
  logSpy.mockRestore()
  for (const w of watchers) {
    w.close()
  }
})

const setup = (opts: $Shape<Opts>) => ({
  watch: 'app',
  plugins: [],
  templates: [],
  ...opts,
})

const addToWatchers = (opts: $Shape<Opts>) => () => {
  watchers.push(m(setup(opts)))
}

test('export function', () => {
  expect(typeof m).toBe('function')
})

test('throw error when opts.watch == null', () => {
  expect(() => {
    // $FlowFixMe
    m({ watch: null })
  }).toThrowErrorMatchingSnapshot()
})

test('throw error when opts.plugins !== Array', () => {
  expect(() => {
    // $FlowFixMe
    m(setup({ plugins: 'not array' }))
  }).toThrowErrorMatchingSnapshot()
})

test('throw error when opts.templates !== Array', () => {
  expect(() => {
    // $FlowFixMe
    m(setup({ templates: 'string' }))
  }).toThrowErrorMatchingSnapshot()
})

test('throw error when opts.after !== Array', () => {
  expect(() => {
    // $FlowFixMe
    m(setup({ afterHooks: 'string' }))
  }).toThrowErrorMatchingSnapshot()
})

test('not throw when no args', () => {
  expect(addToWatchers()).not.toThrow()
})

test('Displayed "start" on the Consle', () => {
  expect(addToWatchers()).not.toThrow()
  expect(logSpy.mock.calls.length).toBe(1)
  expect(logSpy.mock.calls[0][0]).toMatch('start')
})
