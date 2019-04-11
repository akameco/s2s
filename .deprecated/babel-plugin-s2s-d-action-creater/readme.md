# babel-plugin-s2s-d-action-constants

> s2s plugin for `d`

## Install

```
$ yarn add --dev babel-plugin-s2s-d-action-constants
```

### Example

#### IN:

```js
import { type UserRes } from '../../types/Api'
import * as constants from './constants'

export type FetchUser = {
  type: typeof constants.FETCH_USER,
  payload: string,
}

export type FetchUserSuccess = {
  type: typeof constants.FETCH_USER_SUCCESS,
  payload: UserRes,
}

export type Action = FetchUser | FetchUserSuccess
```

#### OUT:

```js
// @flow
import { type UserRes } from '../../types/Api'
import * as constants from './constants'
import type { Action } from './types'

export const fetchUser = (payload: string): Action => {
  return {
    type: constants.FETCH_USER,
    payload,
  }
}

export const fetchUserSuccess = (payload: UserRes): Action => {
  return {
    type: constants.FETCH_USER_USER,
    payload,
  }
}
```

### Usage

```
{
  ['s2s-d-action-creater']
}
```
