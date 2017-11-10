// @flow
import * as t from 'babel-types'
import flowComment from 'babel-add-flow-comments'
import globby from 'globby'
import upperCamelCase from 'uppercamelcase'
import type { Path, State } from 's2s-babel-flow-types'
import {
  getImportPath,
  template,
  inheritsOpts,
  getParentDirName,
  defaultImport,
} from 's2s-utils'

const builders = {
  redux: template(`IMPORT_DECLARATION`),
  root: template(`export default combineReducers(OBJ)`),
}

const getTypeName = (path: string) => upperCamelCase(getParentDirName(path))

export default () => {
  return {
    inherits: inheritsOpts,
    name: 's2s-reducer-root',
    visitor: {
      Program(programPath: Path, state: State) {
        const { input, output } = state.opts
        const combineReducers = state.opts.combineReducers || 'redux'
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

        const files = globby.sync(input, globOptions)

        const imports = files.map(f =>
          defaultImport(getTypeName(f), getImportPath(output, f))
        )

        const props = files
          .map(getTypeName)
          .map(x => t.identifier(x))
          .map(name => t.objectProperty(name, name, false, true))

        function createImport(v) {
          const i = t.identifier('combineReducers')
          return t.importDeclaration(
            [t.importSpecifier(i, i)],
            t.stringLiteral(v)
          )
        }
        programPath.node.body = [
          builders.redux({
            IMPORT_DECLARATION: createImport(combineReducers),
          }),
          ...imports,
          t.noop(),
          builders.root({ OBJ: t.objectExpression(props) }),
        ]

        flowComment(programPath)
      },
    },
  }
}
