// @flow
import path from 'path'
import pluginTester from 'babel-plugin-tester'
import plugin from '.'

const filename = path.resolve(process.cwd(), 'app', 'counter', 'actionTypes.js')

pluginTester({
  title: 'default',
  plugin,
  snapshot: true,
  babelOptions: { filename },
  tests: [
    {
      title: 'one function',
      code: `
// @flow
export const INCREMENT: "counter/INCREMENT" = "counter/INCREMENT";

export const Actions = {
  INCREMENT
};

export type Increment = {
  type: typeof INCREMENT
};

export type Action = Increment;
      `,
    },
    {
      title: 'some function',
      code: `
export const INCREMENT: 'App/INCREMENT' = 'App/INCREMENT'
export const DECREMENT: 'App/DECREMENT' = 'App/DECREMENT'

export const Actions = {
  INCREMENT,
  DECREMENT,
}

export type Increment = {
  type: typeof INCREMENT,
}

export type Decrement = {
  type: typeof DECREMENT,
}

export type Action = Increment | Decrement
      `,
    },
    {
      title: 'has prop',
      code: `
// @flow
export const ADD: 'App/ADD' = 'App/ADD'

export const Actions = {
  ADD,
}

export type Add = {
  type: typeof ADD,
  payload: number,
}

export type Action = Add
    `,
    },
    {
      title: 'another import',
      code: `
// @flow
import type { Count } from './types'

export const ADD: 'App/ADD' = 'App/ADD'

export const Actions = {
  ADD,
}

export type Add = {
  type: typeof ADD,
  n: number,
  payload: Count,
}

export type Action = Add
    `,
    },
  ],
})
