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
        // eslint-disable-next-line unicorn/prevent-abbreviations
        exit(programPath: BabelPath, { opts }: State) {
          const { input, output } = opts
          const globOptions = {
            absolute: true,
            ...opts.globOptions,
          }

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

          // export type Action = ...
          const exportTypeActionAst = t.exportNamedDeclaration(
            t.typeAlias(
              t.identifier('Action'),
              null,
              t.createUnionTypeAnnotation([
                t.genericTypeAnnotation(t.identifier('ReduxInitAction')),
                ...files
                  .map(createActionName)
                  .map(name => t.genericTypeAnnotation(t.identifier(name))),
              ])
            ),
            []
          )

          programPath.node.body = [
            ...imports,
            t.noop(),
            createInitAction(),
            t.noop(),
            exportTypeActionAst,
          ]

          flowComment(programPath)
        },
      },
    },
  }
}
