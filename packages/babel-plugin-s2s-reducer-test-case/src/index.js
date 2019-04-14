// @flow
import fs from 'fs'
import * as t from '@babel/types'
import flowSyntax from '@babel/plugin-syntax-flow'
import camelCase from 'camelcase'
import looksLike from 'babel-looks-like'
import getReducerCase from 's2s-helper-get-reducer-case'
import getInitialStae from 's2s-helper-get-initial-state'
import { template } from 's2s-utils'
import type { BabelPath, State } from 'types/babel'
// import blog from 'babel-log'

const testBuilder = template(`
test(TEST_TITLE, () => {
  expect(reducer(initialState, actions.ACTION())).toEqual(STATE)
})
`)

export default () => {
  return {
    inherits: flowSyntax,
    name: 's2s-reducer-test-case',
    visitor: {
      Program(
        rootPath: BabelPath,
        {
          opts: { from },
        }: State
      ) {
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
              const value: string = testTitlePath.get('value').node
              existTestCases.push(value.replace('handle ', ''))
            }
          },
        })

        const code = fs.readFileSync(from, 'utf8')
        const state = getInitialStae(code) || t.nullLiteral()

        function add(actionType: string) {
          rootPath.pushContainer('body', [
            t.noop(),
            testBuilder({
              TEST_TITLE: t.stringLiteral(`handle ${actionType}`),
              ACTION: t.identifier(camelCase(actionType)),
              STATE: state,
            }),
          ])
        }

        const actions = getReducerCase(code)

        actions.filter(v => !existTestCases.includes(v)).forEach(add)
      },
    },
  }
}
