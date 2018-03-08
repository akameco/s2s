// @flow
import type { BabelPath } from 'types/babel'
import flowSyntax from 'babel-plugin-syntax-flow'
import * as t from 'babel-types'
import constantCase from 'constant-case'
import flowComment from 'babel-add-flow-comments'
import { template } from 's2s-utils'
// import blog from 'babel-log'

const builders = {
  actionType: template(`export type NAME = { type: typeof constants.VALUE }`),
  action: template(`export type Action = UNION`),
}

export default () => {
  return {
    inherits: flowSyntax,
    name: 's2s-d-action-types',
    visitor: {
      Program: {
        exit(programPath: BabelPath) {
          const imports = []
          const typeNameSet: Set<string> = new Set()
          const actionMap: Map<string, Node> = new Map()

          function addTypes(path: BabelPath) {
            const v: string = path.get('id').node.name
            typeNameSet.add(v)
            if (v.endsWith('Request')) {
              typeNameSet.add(v.replace(/Request$/, 'Success'))
              typeNameSet.add(v.replace(/Request$/, 'Failure'))
            }
          }

          programPath.traverse({
            ImportDeclaration(path: BabelPath) {
              imports.push(path.node)
            },
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

          const typesAst = typeNames.map(name => {
            if (actionMap.has(name)) {
              return actionMap.get(name)
            }

            return builders.actionType({
              NAME: t.identifier(name),
              VALUE: t.identifier(constantCase(name)),
            })
          })

          const union = typeNames.map(name =>
            t.genericTypeAnnotation(t.identifier(name))
          )

          const action = builders.action({
            UNION: t.unionTypeAnnotation(union),
          })

          if (imports.length > 0) {
            imports.push(t.noop())
          }

          programPath.node.body = [
            ...imports,
            t.noop(),
            ...typesAst,
            t.noop(),
            action,
          ]

          flowComment(programPath)
        },
      },
    },
  }
}
