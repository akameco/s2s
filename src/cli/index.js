// @flow
import s2s from '../'
import loadConfig from './loadConfig'

export function run() {
  try {
    const opts = loadConfig()
    s2s(opts)
  } catch (err) {
    console.error(err)
  }
}
