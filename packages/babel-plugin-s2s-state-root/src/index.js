// @flow
import * as t from '@babel/types'
import flowComment from 'babel-add-flow-comments'
import globby from 'globby'
import upperCamelCase from 'uppercamelcase'
import type { BabelPath, State } from 'types/babel'
import {
  getImportPath,
  inheritsOpts,
  getParentDirName,
  typeImport,
} from 's2s-utils'

const getTypeName = (path: string) => upperCamelCase(getParentDirName(path))

export default () => {
  return {
    inherits: inheritsOpts,
    name: 's2s-state-root',
    visitor: {
      Program(programPath: BabelPath, state: State) {
        const { input, output } = state.opts
        const globOptions = {
          absolute: true,
          ...state.opts.globOptions,
        }

        if (!input) {
          throw new Error('require input option')
        }

        if (!output) {
          throw new Error('require output option')
        }

        const files = globby.sync(input, globOptions)

        const imports = files.map(f =>
          typeImport(getTypeName(f), 'State', getImportPath(output, f))
        )

        const properties = files
          .map(getTypeName)
          .map(x => t.identifier(x))
          .map(name =>
            t.objectTypeProperty(name, t.genericTypeAnnotation(name))
          )

        // export type State = ...
        const exportTypeStateAst = t.exportNamedDeclaration(
          t.typeAlias(
            t.identifier('State'),
            null,
            t.objectTypeAnnotation(properties, null, null)
          ),
          []
        )

        programPath.node.body = [...imports, t.noop(), exportTypeStateAst]

        flowComment(programPath)
      },
    },
  }
}
