// @flow
import type { Opts } from '../types'

const findUp = require('find-up')

const S2S_CONFIG_JS = 's2s.config.js'

export default function loadConfig(): Opts {
  const fp = findUp.sync(S2S_CONFIG_JS)
  if (!fp) {
    throw new Error(`required ${S2S_CONFIG_JS}`)
  }
  // $FlowFixMe
  const configModule = require(fp)
  return configModule
}
