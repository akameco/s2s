// @flow
import findUp from 'find-up'
import type { Opts } from 'types'

const S2S_CONFIG_JS = 's2s.config.js'

export default function loadConfig(cwd: string = process.cwd()): Opts {
  const fp = findUp.sync(S2S_CONFIG_JS, { cwd })
  if (!fp) {
    throw new Error(`required ${S2S_CONFIG_JS}`)
  }
  // $FlowFixMe
  const configModule = require(fp) // eslint-disable-line
  return configModule
}
