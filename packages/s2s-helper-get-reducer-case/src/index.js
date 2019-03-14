// @flow
import { parse } from 'babylon'
import traverse from 'babel-traverse'
import type { Code } from 'types'
// import blog from 'babel-log'

export default function getReducerCase(code: Code): Array<string> {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['flow', 'objectRestSpread'],
  })
  const actions = []

  traverse(ast, {
    SwitchCase(path) {
      const testPath = path.get('test')
      if (!testPath.isMemberExpression()) {
        return
      }

      if (testPath.get('object').node.name !== 'Actions') {
        return
      }

      actions.push(testPath.get('property').node.name)
    },
  })

  return actions
}
