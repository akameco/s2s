// @flow
import findUp from 'find-up'
import type { Config } from 'types'

const S2S_CONFIG_JS = 's2s.config.js'

export default function loadConfig(cwd: string = process.cwd()): Config {
  const fp = findUp.sync(S2S_CONFIG_JS, {
    cwd,
  })
  if (!fp) {
    throw new Error(`required ${S2S_CONFIG_JS}`)
  }
  // $FlowFixMe
  const configModule = require(fp) // eslint-disable-line global-require,import/no-dynamic-require
  return configModule
}
