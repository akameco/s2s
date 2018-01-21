// @flow
import type { Handler, Code } from 'types'
import cssToFlow from 'css-to-flow'

function handler(code: Code) {
  return {
    code: cssToFlow(code),
    meta: {
      handlerName: 'css-to-flow',
    },
  }
}

export const DEFAULT_CONFIG = {
  test: /.*.css$/,
  handler,
  output: '[name].css.flow',
}

export default (handler: Handler)
