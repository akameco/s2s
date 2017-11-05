// @flow
import { parse } from 'babylon'
import traverse from 'babel-traverse'
import { getTypeFromFile, getTypeFromFileSync } from 'flow-execa'
// import blog from 'babel-log'

type Opts = {
  row: number,
  column: number,
  cwd?: string,
}

export default flowFaker

async function flowFaker(
  filePath: string,
  { row, column, cwd = process.cwd() }: Opts
) {
  const ast = await getTypeFromFile(cwd, filePath, row, column)
  return _flowFaker(ast)
}

export function flowFakerSync(
  filePath: string,
  { row, column, cwd = process.cwd() }: Opts
) {
  const ast = getTypeFromFileSync(cwd, filePath, row, column)
  return _flowFaker(ast)
}

function _flowFaker(ast) {
  if (!ast) {
    return {}
  }

  const output = astToObj(getTypeAst(ast))
  const result = createInitialStateFromTypeInfo(output)
  return result
}

function typeToValue(typeInfo: string | null) {
  switch (typeInfo) {
    case 'number':
      return 0
    case 'string':
      return ''
    case 'boolean':
      return false
    default:
      return null
  }
}

export function createInitialStateFromTypeInfo(
  info: Object | $ReadOnlyArray<*> | string | null
) {
  if (!info || typeof info === 'string') {
    return typeToValue(info)
  }

  if (Array.isArray(info)) {
    return []
  }

  return Object.keys(info).reduce((acc, key) => {
    // $FlowFixMe
    return { ...acc, [key]: createInitialStateFromTypeInfo(info[key]) }
  }, {})
}

export function getTypeAst(input: string) {
  const typeString = `type X = ${input}`

  const ast = parse(typeString, {
    plugins: ['flow'],
    sourceType: 'module',
  })

  let typeAST = {}

  traverse(ast, {
    TypeAlias(nodePath) {
      if (nodePath.get('id').isIdentifier({ name: 'X' })) {
        typeAST = nodePath.get('right')
      }
    },
  })

  return typeAST
}

function getType(node) {
  const nodeType = node.type

  if (!nodeType) {
    return null
  }

  if (nodeType === 'ObjectTypeAnnotation') {
    const props = node.properties
    return props.reduce((acc, prop) => {
      const key = prop.key.name
      return prop.optional ? acc : { ...acc, [key]: getType(prop.value) }
    }, {})
  }

  if (nodeType === 'ArrayTypeAnnotation') {
    return []
  }

  if (nodeType === 'GenericTypeAnnotation') {
    if (node.typeParameters && node.typeParameters.params.length > 0) {
      const params = node.typeParameters.params
      return params.reduce((arr, param) => {
        return [...arr, getType(param)]
      }, [])
    }
  }

  if (nodeType === 'NullableTypeAnnotation') {
    return null
  }

  if (nodeType === 'StringTypeAnnotation') {
    return 'string'
  }

  if (nodeType === 'NumberTypeAnnotation') {
    return 'number'
  }

  if (nodeType === 'BooleanTypeAnnotation') {
    return 'boolean'
  }

  return nodeType
}

function isNodeLike(obj) {
  return typeof obj.type === 'string' || typeof obj.kind === 'string'
}

function isPathLike(obj) {
  return isNodeLike(obj) && {}.hasOwnProperty.call(obj, 'node')
}

export function astToObj(input: *) {
  if (isPathLike(input)) {
    input = input.node
  }

  return getType(input)
}
