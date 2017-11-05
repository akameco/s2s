// @flow
const helper = require('./').default

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
