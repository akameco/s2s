// @flow
import { parse } from 'babylon'
import traverse from 'babel-traverse'
// import blog from 'babel-log'

/* ::
type Code = string
*/

export default function getReducerCase(code /* : Code */) {
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

      // TODO 他ファイルのアクションも受け入れる
      // が、とりあえずs2s stackのみの動作を目指す
      if (testPath.get('object').node.name !== 'Actions') {
        return
      }

      actions.push(testPath.get('property').node.name)
    },
  })

  return actions
}
