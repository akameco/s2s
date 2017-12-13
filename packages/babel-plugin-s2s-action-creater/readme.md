# babel-plugin-s2s-action-creater

> generate action types

## Install

```
$ npm install --save-dev babel-plugin-s2s-action-creater
```

## Usage

#### in:

```js
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
```

### out:

```js
// @flow
import { ADD } from './actionTypes'
import type { Add } from './actionTypes'

export function add(payload: number): Add {
  return {
    type: ADD,
    payload,
  }
}
```
