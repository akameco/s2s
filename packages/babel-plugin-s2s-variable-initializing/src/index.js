// @flow
import { parseExpression } from 'babylon'
import { inheritsOpts } from 's2s-utils'
import { flowFakerSync } from 'flow-faker'
import type { Path, State } from 's2s-babel-flow-types'
// import blog from 'babel-log'

const parseFromObj = obj =>
  parseExpression(JSON.stringify(obj), { plugins: ['flow'] })

export default () => {
  return {
    inherits: inheritsOpts,
    name: 's2s-variable-initializing',
    visitor: {
      Program(programPath: Path, state: State) {
        const { opts: { from } } = state
        programPath.traverse({
          VariableDeclarator(nodePath) {
            if (nodePath.get('init').node) {
              return
            }

            if (!nodePath.get('id.typeAnnotation').node) {
              return
            }

            const { line, column } = nodePath.get('loc.start').node

            const flowInfoObj = flowFakerSync(from, {
              row: line,
              column: column + 1,
            })

            nodePath.get('init').replaceWith(parseFromObj(flowInfoObj))
          },
        })
      },
    },
  }
}
