// @flow
import lock from '../lock'

jest.useFakeTimers()

test('call clear after 1 second', () => {
  lock.add('test')
  expect(lock.has('test')).toBe(true)
  jest.runTimersToTime(1000)
  expect(lock.has('test')).toBe(false)
})
