// @flow
import { transform } from '@babel/core'
import type { Code, HandlerOpts } from 'types'

// eslint-disable-next-line
export type Opts = string | Function | [string | Function, Object]

export default function babelNextHandler(
  code: Code,
  { eventPath, plugin, filename }: HandlerOpts
): Code {
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
  })

  return result ? result.trim() : ''
}
