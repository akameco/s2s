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
  typeImport,
} from 's2s-utils'

const createObjectType = input =>
  template(`export type State = STATE`)({
    STATE: t.objectTypeAnnotation(input, null, null),
  })

const getTypeName = (path: string) => upperCamelCase(getParentDirName(path))

export default () => {
  return {
    inherits: inheritsOpts,
    name: 's2s-state-root',
    visitor: {
      Program(programPath: Path, state: State) {
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

        const files = globby.sync(input, globOptions)

        const imports = files.map(f =>
          typeImport(getTypeName(f), 'State', getImportPath(output, f))
        )

        const props = files
          .map(getTypeName)
          .map(x => t.identifier(x))
          .map(name =>
            t.objectTypeProperty(name, t.genericTypeAnnotation(name))
          )

        programPath.node.body = [...imports, t.noop(), createObjectType(props)]

        flowComment(programPath)
      },
    },
  }
}
