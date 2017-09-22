// @flow
import Lock from '../lock'

jest.useFakeTimers()

test('call clear after 1 second', () => {
  const lock = new Lock()
  lock.add('test')
  expect(lock.has('test')).toBe(true)
  jest.runTimersToTime(1000)
  expect(lock.has('test')).toBe(false)
})
