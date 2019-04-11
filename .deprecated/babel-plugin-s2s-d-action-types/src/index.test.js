// @flow
import path from 'path'
import pluginTester from 'babel-plugin-tester'
import plugin from '.'

const filename = path.resolve(process.cwd(), 'app', 'counter', 'actions.js')

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
      title: 'payload',
      code: `
export const INCREMENT: 'app/counter/Increment' = 'app/counter/Increment';

export type Increment = { type: typeof INCREMENT, payload: number };

export type Action = Increment;
  `,
    },
    {
      title: 'remove unuded action',
      code: `
export const INCREMENT: 'app/counter/Increment' = 'app/counter/Increment';

export type Increment = { type: typeof INCREMENT, payload: number };

export type Action = Decrement;
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
      title: 'already has Actions',
      code: `
const x = 'x'

export const Actions = {}

export type Action = Add;
        `,
    },
    {
      title: 'Request/Failure/Success pattern',
      code: `
export type Action = FetchRequest;
        `,
    },
    {
      title: 'Request/Failure/Success pattern when Request/Success',
      code: `
export type Action = FetchRequest | FetchSuccess;
        `,
    },
    {
      title: 'Request/Failure/Success pattern when exist Success/Failure',
      code: `
export type Action = FetchSuccess | FetchFailure;
        `,
    },
    {
      title: 'no type Action',
      code: `// @flow`,
    },
    {
      title: 'no GenericTypeAnnotation',
      code: `export type Action = string`,
    },
    {
      title: 'default',
      code: `
// @flow
import * as constants from './constants'

export type Action = Increment
    `,
    },
  ],
})
