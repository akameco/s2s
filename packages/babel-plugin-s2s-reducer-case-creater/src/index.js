// @flow
import fs from 'fs'
import * as t from 'babel-types'
import getActionObj, { getAllTypeProperty } from 's2s-helper-get-action-obj'
import { template, inheritsOpts } from 's2s-utils'
import type { BabelPath, State } from 'types/babel'
import upperCamelCase from 'uppercamelcase'
// import blog from 'babel-log'

const builder = {
  test: template(`Actions.TYPE`),
  consequent: template(`return {...state}`, ['objectRestSpread']),
}

export default () => {
  return {
    inherits: inheritsOpts(),
    name: 's2s-reducer-case-creater',
    visitor: {
      Program(rootPath: BabelPath, { opts: { from } }: State) {
        if (!from) {
          throw new Error('required from option')
        }

        const code = fs.readFileSync(from, 'utf8')

        // 重複を避けるためSetに変換
        const actionSet: Set<string> = new Set(getActionObj(code))
        const actionMap = getAllTypeProperty(code)

        rootPath.traverse({
          SwitchCase(path) {
            const testPath = path.get('test')
            if (!testPath.isMemberExpression()) {
              return
            }

            if (testPath.get('object').node.name !== 'Actions') {
              return
            }

            const caseName = testPath.get('property').node.name
            if (actionSet.has(caseName)) {
              actionSet.delete(caseName)
            }
          },
        })

        rootPath.traverse({
          SwitchStatement(path) {
            if (!path.findParent(p => p.isExportDefaultDeclaration())) {
              return
            }

            const items = Array.from(actionSet).map(name => {
              const testAST = builder.test({ TYPE: t.identifier(name) })
                .expression

              const propsAST = actionMap[upperCamelCase(name)]
                .filter(v => v !== 'type')
                .map(v =>
                  t.objectProperty(t.identifier(v), t.identifier(`action.${v}`))
                )

              const returnStatement = builder.consequent()
              returnStatement.argument.properties = [
                ...returnStatement.argument.properties,
                ...propsAST,
              ]

              return t.switchCase(testAST, [returnStatement])
            })

            path.unshiftContainer('cases', items)
          },
        })
      },
    },
  }
}
