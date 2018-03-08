// @flow
import type { BabelPath } from 'types/babel'
import flowSyntax from 'babel-plugin-syntax-flow'
import * as t from 'babel-types'
import constantCase from 'constant-case'
import flowComment from 'babel-add-flow-comments'
import { template } from 's2s-utils'
// import blog from 'babel-log'

const builders = {
  constants: template(`export const NAME: VALUE = VALUE`),
}

export default () => {
  return {
    inherits: flowSyntax,
    name: 's2s-d-action-constants',
    visitor: {
      Program: {
        exit(programPath: BabelPath) {
          const typeNameSet: Set<string> = new Set()
          const actionMap: Map<string, Node> = new Map()

          function addTypes(path: BabelPath) {
            const v: string = path.get('id').node.name
            typeNameSet.add(v)
          }

          programPath.traverse({
            TypeAlias(path: BabelPath) {
              if (path.get('id').node.name === 'Action') {
                const right = path.get('right')
                if (right.isUnionTypeAnnotation()) {
                  for (const typePath of right.get('types')) {
                    addTypes(typePath)
                  }
                } else if (right.isGenericTypeAnnotation()) {
                  addTypes(right)
                }
                // remove `type Action = ...`
                path.remove()
              } else {
                const node = path.get('id').node
                actionMap.set(node.name, path.parentPath.node)
              }
            },
          })

          const typeNames = [...typeNameSet.values()]

          const constantAST = typeNames.map(x => {
            const name = constantCase(x)
            const value = t.stringLiteral(name)

            const actionName = t.identifier(name)
            actionName.typeAnnotation = t.typeAnnotation(
              t.genericTypeAnnotation(value)
            )

            return builders.constants({ NAME: actionName, VALUE: value })
          })

          programPath.node.body = [...constantAST]

          flowComment(programPath)
        },
      },
    },
  }
}
