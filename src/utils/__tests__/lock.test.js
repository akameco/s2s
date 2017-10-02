// @flow
import lock from '../lock'

jest.useFakeTimers()

test('call clear after 1 second', () => {
  lock.add('test')
  expect(lock.has('test')).toBe(true)
  jest.runTimersToTime(1000)
  expect(lock.has('test')).toBe(false)
})

test('call clearTimeout when add double', () => {
  lock.add('test')
  expect(lock.has('test')).toBe(true)
  lock.add('test')
  expect(clearTimeout).toHaveBeenCalled()
})

test('delete', () => {
  lock.add('delete')
  lock.delete('delete')
  expect(lock.has('delete')).toBe(false)
})
