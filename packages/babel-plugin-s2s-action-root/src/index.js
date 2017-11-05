// @flow
import flowSyntax from 'babel-plugin-syntax-flow'
import * as t from 'babel-types'
import { removeFlowComment, addFlowComment } from 'babel-add-flow-comments'
import globby from 'globby'
import upperCamelCase from 'uppercamelcase'
import {
  getImportPath,
  template,
  getParentDirName,
  typeImport,
} from 's2s-utils'
import type { Path, State } from 's2s-babel-flow-types'

const createUnion = union =>
  template(`export type Action = UNION`)({
    UNION: t.unionTypeAnnotation(union),
  })

const createInitAction = template(
  `export type ReduxInitAction = { type: '@@INIT' }`
)

function createActionName(path: string) {
  return `${upperCamelCase(getParentDirName(path))}Action`
}

export default () => {
  return {
    inherits: flowSyntax,
    name: 's2s-action-root',
    visitor: {
      Program: {
        exit(programPath: Path, state: State) {
          const { file } = state
          removeFlowComment(file.ast.comments)
          const { input, output } = state.opts
          const globOptions = Object.assign(
            { absolute: true },
            state.opts.globOptions
          )

          if (!input) {
            throw new Error('require input option')
          }

          if (!output) {
            throw new Error('require output option')
          }

          const files: $ReadOnlyArray<string> = globby.sync(input, globOptions)

          const imports = files.map(f =>
            typeImport(createActionName(f), 'Action', getImportPath(output, f))
          )

          const union = files
            .map(createActionName)
            .map(name => t.genericTypeAnnotation(t.identifier(name)))

          const initAction = 'ReduxInitAction'
          union.unshift(t.genericTypeAnnotation(t.identifier(initAction)))

          const action = createUnion(union)

          programPath.node.body = [
            ...imports,
            t.noop(),
            createInitAction(),
            t.noop(),
            action,
          ]

          addFlowComment(programPath)
        },
      },
    },
  }
}
