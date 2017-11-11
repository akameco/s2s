// @flow
import { parseExpression } from 'babylon'
import { inheritsOpts } from 's2s-utils'
import { flowFakerSync } from 'flow-faker'
import generator from 'babel-generator'
import type { BabelPath, State } from 'types/babel'
import json5 from 'json5'
import typedAssign from 'typed-assign'
// import blog from 'babel-log'

const INITIAL_STATE = 'initialState'

const parseFromObj = obj =>
  parseExpression(JSON.stringify(obj), {
    plugins: ['flow'],
  })

const getObj = n => json5.parse(generator(n).code)

export default () => {
  return {
    inherits: inheritsOpts,
    name: 's2s-initial-state-creater',
    visitor: {
      Program(programPath: BabelPath, state: State) {
        const { opts: { from } } = state
        programPath.traverse({
          VariableDeclarator(nodePath) {
            const idPath = nodePath.get('id')
            if (idPath.node.name !== INITIAL_STATE) {
              return
            }

            const { line, column } = nodePath.get('loc.start').node
            const flowInfoObj = flowFakerSync(from, {
              row: line,
              column: column + 1,
            })

            const NodeFromFlowtype = parseFromObj(flowInfoObj)
            const NodeFromVariable = nodePath.get('init').node

            const mergedObj = typedAssign(
              {},
              getObj(NodeFromVariable),
              getObj(NodeFromFlowtype)
            )

            nodePath.get('init').replaceWith(parseFromObj(mergedObj))
          },
        })
      },
    },
  }
}
