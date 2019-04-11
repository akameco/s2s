// @flow weak
import { inheritsOpts } from 's2s-utils'
import { flowFakerSync } from 'flow-faker'
import type { BabelPath, State } from 'types/babel'
// import blog from 'babel-log'

export default ({ types: t }) => {
  return {
    inherits: inheritsOpts,
    name: 's2s-func-param-init',
    visitor: {
      Program(programPath: BabelPath, state: State) {
        const {
          opts: { from },
        } = state
        programPath.traverse({
          FunctionDeclaration(nodePath) {
            const paramPath = nodePath.get('params.0')
            if (!paramPath) {
              return
            }

            if (t.isIdentifier(paramPath)) {
              const { line, column } = paramPath.get('loc.start').node
              const flowInfoObj = flowFakerSync(from, {
                row: line,
                column: column + 1,
              })

              if (
                !flowInfoObj ||
                typeof flowInfoObj !== 'object' ||
                Array.isArray(flowInfoObj)
              ) {
                return
              }

              const params = Object.keys(flowInfoObj).map(key => {
                return t.objectProperty(
                  t.identifier(key),
                  t.identifier(key),
                  false,
                  true
                )
              })

              paramPath.replaceWith(
                t.objectPattern(params, paramPath.get('typeAnnotation').node)
              )
            }
          },
        })
      },
    },
  }
}
