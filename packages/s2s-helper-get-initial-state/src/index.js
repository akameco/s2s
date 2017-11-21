// @flow
import { parse } from 'babylon'
import traverse from 'babel-traverse'
import type { Code } from 'types'
import type { BabelNode } from 'types/babel'
// import blog from 'babel-log'

export default function getReducerCase(code: Code): ?BabelNode {
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
