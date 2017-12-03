// @flow

// eslint-disable-next-line flowtype/no-weak-types
export function getPluginName(plugin: Function | string): string {
  if (typeof plugin === 'string') {
    return plugin
  }
  const { name = '' } = plugin()
  return name
}
