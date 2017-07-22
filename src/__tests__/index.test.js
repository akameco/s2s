// @flow
import m from '../index'
import type { Opts } from '../types'

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

test('not throw when plugins,templates,after == null', () => {
  const watchers = []
  const wrap = (opts: $Shape<Opts>) => () => {
    watchers.push(m({ watch: 'app', ...opts }))
  }
  expect(wrap()).not.toThrow()
  // $FlowFixMe
  expect(wrap({ plugins: null })).not.toThrow()
  // $FlowFixMe
  expect(wrap({ templates: null })).not.toThrow()
  // $FlowFixMe
  expect(wrap({ afterHooks: null })).not.toThrow()

  for (const w of watchers) {
    w.close()
  }
})
