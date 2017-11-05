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

  let initialState = null

  traverse(ast, {
    VariableDeclarator(path) {
      const idPath = path.get('id')
      if (idPath.node.name === 'initialState') {
        initialState = path.get('init').node
      }
    },
  })

  return initialState
}
