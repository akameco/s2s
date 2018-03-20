// @flow
import fs from 'fs'
import type { BabelPath, State } from 'types/babel'
import * as t from 'babel-types'
import flowSyntax from 'babel-plugin-syntax-flow'
import looksLike from 'babel-looks-like'
import { parse } from 'babylon'
import traverse from 'babel-traverse'
import _ from 'lodash'
import constantCase from 'constant-case'
import { template } from 's2s-utils'
// import blog from 'babel-log'

const builders = {
  test: template(`test(NAME, () => {
    expect(actions.FUNC()).toMatchSnapshot();
  });`),
}

const createTest = name =>
  builders.test({
    NAME: t.stringLiteral(constantCase(name)),
    FUNC: t.identifier(_.camelCase(name)),
  })

export default () => ({
  inherits: flowSyntax,
  name: 's2s-d-action-tests',
  visitor: {
    Program(rootPath: BabelPath, { opts: { from } }: State) {
      if (!from) {
        throw new Error('required from option')
      }

      const existTestCases = []
      rootPath.traverse({
        CallExpression(callPath: BabelPath) {
          if (
            looksLike(callPath, {
              node: {
                callee: { type: 'Identifier', name: 'test' },
              },
            })
          ) {
            const testTitlePath = callPath.get('arguments')[0]
            existTestCases.push(testTitlePath.get('value').node)
          }
        },
      })

      const code = fs.readFileSync(from, 'utf8')
      const ast = parse(code, {
        sourceType: 'module',
        plugins: ['flow', 'objectRestSpread'],
      })

      const typeNameSet: Set<string> = new Set()

      traverse(ast, {
        TypeAlias(path: BabelPath) {
          if (path.get('id').node.name === 'Action') {
            const right = path.get('right')
            if (right.isUnionTypeAnnotation()) {
              for (const typePath of right.get('types')) {
                typeNameSet.add(typePath.get('id').node.name)
              }
            } else if (right.isGenericTypeAnnotation()) {
              typeNameSet.add(right.get('id').node.name)
            }
            // remove `type Action = ...`
            path.remove()
          }
        },
      })

      function add(actionType: string) {
        rootPath.pushContainer('body', [t.noop(), createTest(actionType)])
      }

      const actions = [...typeNameSet]
      actions
        .map(v => constantCase(v))
        .filter(v => !existTestCases.includes(v))
        .forEach(v => add(v))
    },
  },
})
