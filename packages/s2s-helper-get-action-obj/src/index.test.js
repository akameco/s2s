// @flow
import helper, { getTypeProperty, getAllTypeProperty } from '.'

test('return [] when empty object', () => {
  const fixture = `
export const Actions = {}
`
  expect(helper(fixture)).toEqual([])
})

test('return [INCREMENT]', () => {
  const fixture = `
export const Actions = { INCREMENT }
`
  expect(helper(fixture)).toEqual(['INCREMENT'])
})

test('return [INCREMENT, DECREMENT]', () => {
  const fixture = `
export const Actions = {
  INCREMENT,
  DECREMENT,
}
`
  expect(helper(fixture)).toEqual(['INCREMENT', 'DECREMENT'])
})

test('return [] when Actions = null', () => {
  const fixture = `
export const Actions = null
`
  expect(helper(fixture)).toEqual([])
})

test('return [] when Actions not exist', () => {
  const fixture = `
export const Maction = {Increment}
`
  expect(helper(fixture)).toEqual([])
})

test('getTypeProperty', () => {
  const fixture = `
    export type SetCount = {
      type: 'SET_COUNT',
      count: number,
    }
  `
  const target = 'SetCount'
  expect(getTypeProperty(fixture, target)).toEqual(['type', 'count'])
})

test('getTypeProperty when empty type', () => {
  const fixture = `
    export type SetCount = { }
  `
  const target = 'SetCount'
  expect(getTypeProperty(fixture, target)).toEqual([])
})

test('getTypeProperty when no target', () => {
  const fixture = `
    export type SetCount = { }
  `
  const target = 'Woooooo'
  expect(getTypeProperty(fixture, target)).toEqual([])
})

test('getTypeProperty when no object type', () => {
  const fixture = `
    export type SetCount = number
  `
  const target = 'SetCount'
  expect(getTypeProperty(fixture, target)).toEqual([])
})

test('getAllTypeProperty', () => {
  const fixture = `
    export type SetCount = {
      type: 'SET_COUNT',
      count: number,
    }
  `
  expect(getAllTypeProperty(fixture)).toEqual({ SetCount: ['type', 'count'] })
})

test('getAllTypeProperty when some types', () => {
  const fixture = `
    export type SetCount = {
      type: 'SET_COUNT',
      count: number,
    }

    export type Increment = {
      type: 'INCREMENT',
    }

    type Opps = string
  `

  expect(getAllTypeProperty(fixture)).toEqual({
    Increment: ['type'],
    SetCount: ['type', 'count'],
  })
})
