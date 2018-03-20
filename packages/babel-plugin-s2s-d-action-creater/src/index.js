// @flow
import flowSyntax from 'babel-plugin-syntax-flow'
import * as t from 'babel-types'
import snakeCase from 'lodash.snakecase'
import camelCase from 'lodash.camelcase'
import flowComment from 'babel-add-flow-comments'
import { template, createImportDeclaration } from 's2s-utils'
import type { BabelPath } from 'types/babel'
// import blog from 'babel-log'

const constantCase = (str: string) => snakeCase(str).toUpperCase()

const builders = {
  actionCreater: template(`export const NAME = (PARAMS): Action => {
    return VALUE;
  }`),
  importConstants: template(`import * as constants from './constants'`),
}

function createActionCreater(name, props, params) {
  const typeIdentifier = t.identifier('type')
  return builders.actionCreater({
    NAME: t.identifier(camelCase(name)),
    TYPE: t.identifier(name),
    VALUE: t.objectExpression([
      t.objectProperty(
        typeIdentifier,
        t.memberExpression(
          t.identifier('constants'),
          t.identifier(constantCase(name))
        )
      ),
      ...props,
    ]),
    PARAMS: params,
  })
}

export default () => {
  return {
    inherits: flowSyntax,
    name: 's2s-action-creater',
    visitor: {
      Program: {
        exit(programPath: BabelPath) {
          const imports = []
          const typeNames = []
          const funcs = []

          programPath.traverse({
            ImportDeclaration(path: BabelPath) {
              imports.push(path.node)
            },
            TypeAlias(path: BabelPath) {
              const name = path.get('id').node.name

              if (name === 'Action') {
                return
              }
              typeNames.push(name)

              const params = []
              const props = []

              for (const { key, value } of path.get('right').node.properties) {
                if (key.name !== 'type') {
                  const p = t.identifier(key.name)

                  props.push(t.objectProperty(p, p, false, true))

                  p.typeAnnotation = t.typeAnnotation(value)
                  params.push(p)
                }
              }

              funcs.push(createActionCreater(name, props, params))
              funcs.push(t.noop())
            },
          })

          const typeImport = createImportDeclaration('Action', `./types`)

          typeImport.importKind = 'type'

          programPath.node.body = [typeImport, ...imports, t.noop(), ...funcs]

          flowComment(programPath)
        },
      },
    },
  }
}
