// @flow
import { getPluginName } from '.'

test('string', () => {
  expect(getPluginName('test-plugin')).toBe('test-plugin')
})

test('function with name', () => {
  const plugin = () => ({ name: 'test-plugin' })
  expect(getPluginName(plugin)).toBe('test-plugin')
})

test('function witn no name', () => {
  const plugin = () => ({})
  expect(getPluginName(plugin)).toBe('')
})
