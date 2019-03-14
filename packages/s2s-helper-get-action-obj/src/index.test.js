// @flow
import helper, { getTypeProperty, getAllTypeProperty } from '.'

test('return [] when empty object', () => {
  const fixture = `
export const Actions = {}
`
  expect(helper(fixture)).toStrictEqual([])
})

test('return [INCREMENT]', () => {
  const fixture = `
export const Actions = { INCREMENT }
`
  expect(helper(fixture)).toStrictEqual(['INCREMENT'])
})

test('return [INCREMENT, DECREMENT]', () => {
  const fixture = `
export const Actions = {
  INCREMENT,
  DECREMENT,
}
`
  expect(helper(fixture)).toStrictEqual(['INCREMENT', 'DECREMENT'])
})

test('return [] when Actions = null', () => {
  const fixture = `
export const Actions = null
`
  expect(helper(fixture)).toStrictEqual([])
})

test('return [] when Actions not exist', () => {
  const fixture = `
export const Maction = {Increment}
`
  expect(helper(fixture)).toStrictEqual([])
})

test('getTypeProperty', () => {
  const fixture = `
    export type SetCount = {
      type: 'SET_COUNT',
      count: number,
    }
  `
  const target = 'SetCount'
  expect(getTypeProperty(fixture, target)).toStrictEqual(['type', 'count'])
})

test('getTypeProperty when empty type', () => {
  const fixture = `
    export type SetCount = { }
  `
  const target = 'SetCount'
  expect(getTypeProperty(fixture, target)).toStrictEqual([])
})

test('getTypeProperty when no target', () => {
  const fixture = `
    export type SetCount = { }
  `
  const target = 'Woooooo'
  expect(getTypeProperty(fixture, target)).toStrictEqual([])
})

test('getTypeProperty when no object type', () => {
  const fixture = `
    export type SetCount = number
  `
  const target = 'SetCount'
  expect(getTypeProperty(fixture, target)).toStrictEqual([])
})

test('getAllTypeProperty', () => {
  const fixture = `
    export type SetCount = {
      type: 'SET_COUNT',
      count: number,
    }
  `
  expect(getAllTypeProperty(fixture)).toStrictEqual({
    SetCount: ['type', 'count'],
  })
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

  expect(getAllTypeProperty(fixture)).toStrictEqual({
    Increment: ['type'],
    SetCount: ['type', 'count'],
  })
})
