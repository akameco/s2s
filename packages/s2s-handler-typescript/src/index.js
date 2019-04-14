// @flow
import { transform } from '@babel/core'
import { getPluginName } from 's2s-helper-get-plugin-name'
import tsSyntax from '@babel/plugin-syntax-typescript'
import type { Handler } from 'types'

// eslint-disable-next-line flowtype/no-weak-types
export type Options = string | Function | [string | Function, Object]

export default ((code, { eventPath, plugin, filename }) => {
  if (!plugin || !plugin.plugin) {
    throw new Error('required plugin')
  }

  const options = plugin.plugin
  const fromOptions = { from: eventPath }

  const lastPlugin = Array.isArray(options)
    ? [options[0], { ...options[1], ...fromOptions }]
    : [options, fromOptions]

  const { code: result } = transform(code, {
    filename,
    babelrc: false,
    configFile: false,
    plugins: [tsSyntax, lastPlugin],
  })

  return {
    code: result ? result.trim() : '',
    meta: {
      handlerName: 'typescript',
      pluginName: getPluginName(lastPlugin[0]),
    },
  }
}: Handler)
