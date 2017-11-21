// @flow
import fs from 'fs'
import * as t from 'babel-types'
import { parse } from 'babylon'
import traverse from 'babel-traverse'
import {
  inheritsOpts,
  template,
  getImportPath,
  createImportDeclaration,
} from 's2s-utils'
import flatten from 'lodash.flatten'
import type { BabelPath, State } from 'types/babel'
// import blog from 'babel-log'

const builder = {
  test: template(`test(TITLE, () => {
    const result = FUNC()
    expect(result).toBe(null)
  })`),
}

const getFuncNames = (code /* :string */) => {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['flow', 'objectRestSpread'],
  })

  const names /* :string[] */ = []

  traverse(ast, {
    FunctionDeclaration(path) {
      if (!path.findParent(p => p.isExportDeclaration())) {
        return
      }
      const name = path.get('id').node.name
      names.push(name)
    },
  })

  return names
}

export default () => {
  return {
    inherits: inheritsOpts(),
    name: 's2s-jest-unit-test-case',
    visitor: {
      Program(rootPath: BabelPath, { opts: { from }, file }: State) {
        if (!from) {
          throw new Error('required from option')
        }

        const targetPath = getImportPath(file.opts.filename, from)

        const code = fs.readFileSync(from, 'utf8')
        const names = getFuncNames(code)
        const nameMap: Set<string> = new Set(names)

        rootPath.traverse({
          ImportDeclaration(path) {
            if (path.get('source').node.value === targetPath) {
              path.remove()
            }
          },
          CallExpression(path) {
            const name = path.get('callee').node.name
            nameMap.delete(name)
          },
        })

        const asts = Array.from(nameMap).map(name => [
          t.noop(),
          builder.test({
            TITLE: t.stringLiteral(name),
            FUNC: t.identifier(name),
          }),
        ])

        rootPath.pushContainer('body', flatten(asts))

        rootPath.unshiftContainer('body', [
          createImportDeclaration(names, targetPath),
        ])
      },
    },
  }
}
