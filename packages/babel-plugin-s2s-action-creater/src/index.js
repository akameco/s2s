// @flow
import nodePath from 'path'
import flowSyntax from '@babel/plugin-syntax-flow'
import * as t from '@babel/types'
import snakeCase from 'lodash.snakecase'
import camelCase from 'lodash.camelcase'
import flowComment from 'babel-add-flow-comments'
import { template, createImportDeclaration } from 's2s-utils'
import type { BabelPath, State } from 'types/babel'
// import blog from 'babel-log'

const constantCase = string => snakeCase(string).toUpperCase()

const builders = {
  actionCreater: template(`export function NAME(PARAMS): TYPE {
    return VALUE;
  }`),
}

function createActionCreater(name, properties, params) {
  const typeIdentifier = t.identifier('type')
  return builders.actionCreater({
    NAME: t.identifier(camelCase(name)),
    TYPE: t.identifier(name),
    VALUE: t.objectExpression([
      t.objectProperty(typeIdentifier, t.identifier(constantCase(name))),
      ...properties,
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
        exit(programPath: BabelPath, state: State) {
          const { file } = state
          const basename = nodePath.parse(file.opts.generatorOpts.filename).name

          const imports = []
          const typeNames = []
          const actions = []
          const funcs = []

          programPath.traverse({
            ImportDeclaration(path: BabelPath) {
              imports.push(path.node)
            },
            VariableDeclarator(path: BabelPath) {
              const name = path.get('id').node.name
              if (name !== 'Actions') {
                actions.push(name)
              }
            },
            TypeAlias(path: BabelPath) {
              const name = path.get('id').node.name

              if (name === 'Action') {
                return
              }
              typeNames.push(name)

              const params = []
              const properties = []

              for (const { key, value } of path.get('right').node.properties) {
                if (key.name !== 'type') {
                  const p = t.identifier(key.name)

                  properties.push(t.objectProperty(p, p, false, true))

                  p.typeAnnotation = t.typeAnnotation(value)
                  params.push(p)
                }
              }

              funcs.push(createActionCreater(name, properties, params))
            },
          })

          const constImport = createImportDeclaration(actions, `./${basename}`)
          const typeImport = createImportDeclaration(typeNames, `./${basename}`)

          typeImport.importKind = 'type'

          programPath.node.body = [
            ...imports,
            constImport,
            typeImport,
            t.noop(),
            ...funcs,
          ]

          flowComment(programPath)
        },
      },
    },
  }
}
