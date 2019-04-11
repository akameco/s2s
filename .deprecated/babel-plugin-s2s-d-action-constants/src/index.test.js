// @flow
import path from 'path'
import pluginTester from 'babel-plugin-tester'
import plugin from '.'

const filename = path.resolve(process.cwd(), 'app', 'counter', 'actions.js')

beforeAll(() => {
  jest.resetModules()
  process.env.S2S_ACTION_CONSTANTS_PREFIX = 'app'
})

pluginTester({
  title: 'default',
  plugin,
  snapshot: true,
  babelOptions: { filename },
  tests: [
    `export type Action = Increment`,
    `
    // @flow
    export type Action = Increment
    `,
    `export type Action = Increment | Decrement`,
    {
      title: 'imports',
      code: `
// @flow
import type { X } from './types';

export type Action = Increment
  `,
    },
    {
      title: 'snake_case',
      code: `export type Action = ThisIsAction;`,
    },
    {
      title: 'import type',
      code: `
import type { UserID } from './types.js'

export type FetchUser = {
  type: typeof FETCH_USER,
  id: UserID
};

export type Action = FetchUser;
      `,
    },
    {
      title: 'default',
      code: `
// @flow
import * as constants from './constants.js'

export type Action = Increment
    `,
    },
    {
      title: 'GenericTypeAnnotation',
      code: `
// @flow
import * as constants from './constants.js'

export type Action = string
    `,
    },
  ],
})
