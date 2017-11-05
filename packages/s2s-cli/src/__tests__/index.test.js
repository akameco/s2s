// @flow
import type { Opts } from 'types'
import m from '../index'
import * as utils from '../utils'

let mock
const watchers = []

beforeEach(() => {
  mock = jest.spyOn(utils, 'log')
  mock.mockImplementation(x => x)
})

afterEach(() => {
  mock.mockRestore()
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
  expect(mock.mock.calls.length).toBe(1)
  expect(mock.mock.calls[0][0]).toMatch('start')
})
