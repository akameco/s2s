// @flow
import flowSyntax from 'babel-plugin-syntax-flow'
import * as t from 'babel-types'
import snakeCase from 'lodash.snakecase'
import camelCase from 'lodash.camelcase'
import flowComment from 'babel-add-flow-comments'
import { template } from 's2s-utils'
import type { Path, State } from 's2s-babel-flow-types'
// import blog from 'babel-log'

const constantCase = (str: string) => snakeCase(str).toUpperCase()

const builders = {
  actionCreater: template(`export function NAME(PARAMS): TYPE {
    return VALUE;
  }`),
}

function createActionCreater(name, props, params) {
  const typeIdentifier = t.identifier('type')
  return builders.actionCreater({
    NAME: t.identifier(camelCase(name)),
    TYPE: t.identifier(name),
    VALUE: t.objectExpression([
      t.objectProperty(typeIdentifier, t.identifier(constantCase(name))),
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
        exit(programPath: Path, state: State) {
          const { file } = state
          const basename = file.opts.basename

          const imports = []
          const typeNames = []
          const actions = []
          const funcs = []

          programPath.traverse({
            ImportDeclaration(path: Path) {
              imports.push(path.node)
            },
            VariableDeclarator(path: Path) {
              const name = path.get('id').node.name
              if (name !== 'Actions') {
                actions.push(name)
              }
            },
            TypeAlias(path: Path) {
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
            },
          })

          function createImport(arr: $ReadOnlyArray<string>) {
            const specifiers = []
            for (const x of arr) {
              const i = t.identifier(x)
              specifiers.push(t.importSpecifier(i, i))
            }
            return t.importDeclaration(
              specifiers,
              t.stringLiteral(`./${basename}`)
            )
          }

          const constImport = createImport(actions)
          const typeImport = createImport(typeNames)

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
