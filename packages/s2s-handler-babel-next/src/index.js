// @flow
import { transform } from '@babel/core'
import type { Code, HandlerOpts } from 'types'

export default function babelNextHandler(
  code: Code,
  { eventPath, plugin, filename }: HandlerOpts
): Code {
  const opts = plugin.plugin
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
