// @flow
import fs from 'fs'
import * as t from 'babel-types'
import getActionObj from 's2s-helper-get-action-obj'
import { template, inheritsOpts } from 's2s-utils'
// import blog from 'babel-log'

/* ::
import type {Path, State} from 's2s-babel-flow-types'
*/

const builder = {
  test: template(`Actions.TYPE`),
  consequent: template(`return {...state}`, ['objectRestSpread']),
}

export default () => {
  return {
    inherits: inheritsOpts(),
    name: 's2s-reducer-case-creater',
    visitor: {
      Program(rootPath /* : Path */, { opts: { from } } /* : State */) {
        if (!from) {
          throw new Error('required from option')
        }

        const code = fs.readFileSync(from, 'utf8')
        const actions /* : string[]  */ = getActionObj(code)
        const actionSet /* : Set<string> */ = new Set(actions)

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
              const cons = [builder.consequent()]
              return t.switchCase(testAST, cons)
            })

            path.unshiftContainer('cases', items)
          },
        })
      },
    },
  }
}
