// @flow
import type { Handler } from 'types'
import cssToFlow from 'css-to-flow'

export default (code => {
  return {
    code: cssToFlow(code),
    meta: {
      handlerName: 'css-to-flow',
    },
  }
}: Handler)
