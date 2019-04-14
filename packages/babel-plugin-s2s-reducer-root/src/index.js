// @flow
import * as t from '@babel/types'
import flowComment from 'babel-add-flow-comments'
import globby from 'globby'
import upperCamelCase from 'uppercamelcase'
import type { BabelPath, State } from 'types/babel'
import {
  getImportPath,
  template,
  inheritsOpts,
  getParentDirName,
  defaultImport,
  createImportDeclaration,
} from 's2s-utils'

const builders = {
  root: template(`export default combineReducers(OBJ)`),
}

const getTypeName = (path: string) => upperCamelCase(getParentDirName(path))

export default () => {
  return {
    inherits: inheritsOpts,
    name: 's2s-reducer-root',
    visitor: {
      Program(programPath: BabelPath, state: State) {
        const {
          input,
          output,
          globOptions = {},
          combineReducers = 'redux',
        } = state.opts

        if (!input) {
          throw new Error('require input option')
        }

        if (!output) {
          throw new Error('require output option')
        }

        const files = globby.sync(input, { absolute: true, ...globOptions })

        const imports = files.map(f =>
          defaultImport(getTypeName(f), getImportPath(output, f))
        )

        const properties = files
          .map(getTypeName)
          .map(x => t.identifier(x))
          .map(name => t.objectProperty(name, name, false, true))

        programPath.node.body = [
          createImportDeclaration('combineReducers', combineReducers),
          ...imports,
          t.noop(),
          builders.root({ OBJ: t.objectExpression(properties) }),
        ]

        flowComment(programPath)
      },
    },
  }
}
