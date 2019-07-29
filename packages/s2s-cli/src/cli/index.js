// @flow
import loadConfig from './loadConfig'
import s2s from '..'

export default function run() {
  try {
    const opts = loadConfig()
    s2s(opts)
  } catch (error) {
    console.error(error)
  }
}
