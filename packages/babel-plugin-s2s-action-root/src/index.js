// @flow
import flowSyntax from 'babel-plugin-syntax-flow'
import * as t from 'babel-types'
import flowComment from 'babel-add-flow-comments'
import globby from 'globby'
import upperCamelCase from 'uppercamelcase'
import {
  template,
  typeImport,
  getParentDirName,
  getImportPath,
} from 's2s-utils'
import type { BabelPath, State } from 'types/babel'

const createUnion = union =>
  template(`export type Action = UNION`)({
    UNION: t.unionTypeAnnotation(union),
  })

const createInitAction = template(
  `export type ReduxInitAction = { type: '@@INIT' }`
)

function createActionName(filename: string) {
  return `${upperCamelCase(getParentDirName(filename))}Action`
}

export default () => {
  return {
    inherits: flowSyntax,
    name: 's2s-action-root',
    visitor: {
      Program: {
        exit(programPath: BabelPath, { opts }: State) {
          const { input, output } = opts
          const globOptions = Object.assign(
            { absolute: true },
            opts.globOptions
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

          flowComment(programPath)
        },
      },
    },
  }
}
