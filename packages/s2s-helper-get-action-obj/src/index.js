// @flow
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import type { Code } from 'types'
// import blog from 'babel-log'

const ACTIONS = 'Actions'

export default function getActionObj(code: Code): Array<string> {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['flow', 'objectRestSpread'],
  })
  const actions = []

  traverse(ast, {
    VariableDeclarator(path) {
      if (path.get('id').node.name !== ACTIONS) {
        return
      }
      const objPath = path.get('init')
      if (!objPath.isObjectExpression()) {
        return
      }
      const props = objPath.get('properties')
      for (const prop of props) {
        actions.push(prop.get('key').node.name)
      }
    },
  })

  return actions
}

export function getTypeProperty(code: Code, target: string): Array<string> {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['flow', 'objectRestSpread'],
  })

  const properties = []

  traverse(ast, {
    TypeAlias(path) {
      if (path.get('id').node.name !== target) {
        return
      }

      const path2 = path.get('right')

      if (!path2.isObjectTypeAnnotation()) {
        return
      }

      for (const prop of path2.get('properties')) {
        properties.push(prop.get('key').node.name)
      }
    },
  })

  return properties
}

export function getAllTypeProperty(
  code: Code
): { [key: string]: Array<string> } {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['flow', 'objectRestSpread'],
  })

  const properties = {}

  traverse(ast, {
    TypeAlias(path) {
      const name = path.get('id').node.name

      const path2 = path.get('right')

      if (!path2.isObjectTypeAnnotation()) {
        return
      }

      properties[name] = path2
        .get('properties')
        .map(p => p.get('key').node.name)
    },
  })

  return properties
}
