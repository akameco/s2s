// @flow
import { relative, join, dirname } from 'path'
import flowSyntax from '@babel/plugin-syntax-flow'
import * as t from '@babel/types'
import { template } from 's2s-utils'
import babelTemplate from '@babel/template'
import snakeCase from 'lodash.snakecase'
import flowComment from 'babel-add-flow-comments'
import slash from 'slash'
import type { BabelPath, State, File } from 'types/babel'
import blog from 'babel-log'

const constantCase = (input: string) => snakeCase(input).toUpperCase()

const builders = {
  constants: template(`export const NAME = VALUE`),
  actions: template(`export const Actions = VALUE`),
  actionType: template(`export type NAME = { type: typeof VALUE }`),
}

function getPrefix({ opts: { filename } }: File, removePrefix: string) {
  const file = relative(join(process.cwd(), removePrefix), filename)
  return `${dirname(slash(file))}/`
}

export default () => {
  return {
    inherits: flowSyntax,
    name: 's2s-action-types',
    visitor: {
      Program: {
        exit(programPath: BabelPath, state: State) {
          const {
            file,
            opts: { usePrefix = true, removePrefix = '' },
          } = state

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

          const prefix = usePrefix ? getPrefix(file, removePrefix) : ''

          // const CONS: 'CONS' = 'prefix/CONS'
          const typeNames = [...typeNameSet.values()]

          const constantAST = typeNames.map(x => {
            const name = constantCase(x)
            const value = t.stringLiteral(prefix + name)

            const actionName = t.identifier(name)
            actionName.typeAnnotation = t.typeAnnotation(
              t.stringLiteralTypeAnnotation(prefix + name)
            )
            return builders.constants({ NAME: actionName, VALUE: value })
          })

          const propertiesAst = typeNames.map(name => {
            const x = t.identifier(constantCase(name))
            return t.objectProperty(x, x, false, true)
          })

          const actionsAST = builders.actions({
            VALUE: t.objectExpression(propertiesAst),
          })

          // type ActionA = { typeof ACTION_A }
          const typesAst = typeNames.map(name => {
            if (actionMap.has(name)) {
              return actionMap.get(name)
            }

            return builders.actionType({
              NAME: t.identifier(name),
              VALUE: t.identifier(constantCase(name)),
            })
          })

          // export type Action = ...
          const exportTypeActionAst = t.exportNamedDeclaration(
            t.typeAlias(
              t.identifier('Action'),
              null,
              t.createUnionTypeAnnotation(
                typeNames.map(name =>
                  t.genericTypeAnnotation(t.identifier(name))
                )
              )
            ),
            []
          )

          if (imports.length > 0) {
            imports.push(t.noop())
          }

          programPath.node.body = [
            ...imports,
            ...constantAST,
            t.noop(),
            actionsAST,
            t.noop(),
            ...typesAst,
            t.noop(),
            exportTypeActionAst,
          ]

          flowComment(programPath)
        },
      },
    },
  }
}
