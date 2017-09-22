// @flow
import m from '../index'
import type { Opts } from '../types'
import * as utils from '../utils'

const mock = jest.spyOn(utils, 'log')
mock.mockImplementation(x => x)

const watchers = []

afterEach(() => {
  for (const w of watchers) {
    w.close()
  }
})

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
    m({ watch: 'app', plugins: 'not array' })
  }).toThrowErrorMatchingSnapshot()
})

test('throw error when opts.templates !== Array', () => {
  expect(() => {
    // $FlowFixMe
    m({ watch: 'app', plugins: [], templates: 'string' })
  }).toThrowErrorMatchingSnapshot()
})

test('throw error when opts.after !== Array', () => {
  expect(() => {
    // $FlowFixMe
    m({ watch: 'app', plugins: [], templates: [], afterHooks: 'string' })
  }).toThrowErrorMatchingSnapshot()
})

test('not throw when plugins,templates == null', () => {
  const wrap = (opts: $Shape<Opts>) => () => {
    watchers.push(m({ watch: 'app', ...opts }))
  }
  expect(wrap()).not.toThrow()
  // $FlowFixMe
  expect(wrap({ plugins: null })).not.toThrow()
  // $FlowFixMe
  expect(wrap({ templates: null })).not.toThrow()
})

test('Displayed "start" on the Consle', () => {
  mock.mockReset()
  const wrap = (opts: $Shape<Opts>) => () => {
    watchers.push(m({ watch: 'app', ...opts }))
  }
  expect(wrap()).not.toThrow()
  expect(mock.mock.calls.length).toBe(1)
  expect(mock.mock.calls[0][0]).toMatch('start')
})
