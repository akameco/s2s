// @flow
import { transform } from 'babel-core'
import { getPluginName } from 's2s-helper-get-plugin-name'
import type { Handler } from 'types'

// eslint-disable-next-line flowtype/no-weak-types
export type Opts = string | Function | [string | Function, Object]

export default ((code, { eventPath, plugin, filename }) => {
  if (!plugin || !plugin.plugin) {
    throw new Error('required plugin')
  }

  const opts: Opts = plugin.plugin
  const fromOpts = { from: eventPath }

  const lastPlugin = Array.isArray(opts)
    ? [opts[0], { ...opts[1], ...fromOpts }]
    : [opts, fromOpts]

  const { code: result } = transform(code, {
    filename,
    babelrc: false,
    plugins: [lastPlugin],
    parserOpts: {
      plugins: ['jsx', 'flow', 'objectRestSpread', 'classProperties'],
    },
  })

  return {
    code: result ? result.trim() : '',
    meta: {
      handlerName: 'babel',
      pluginName: getPluginName(lastPlugin[0]),
    },
  }
}: Handler)
