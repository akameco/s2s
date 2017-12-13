# babel-plugin-s2s-reducer-test-case

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> s2s plugin: create reducr test case from reducer.js

## Install

```
$ npm install --save-dev babel-plugin-s2s-state-root
```

### Example

#### reducer.js

```js
import * as Actions from './actionTypes'

export const initialState = {
  count: 0,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case Actions.INCREMENT:
      return { count: state + 1 }
    case Actions.DECREMENT:
      return { count: state - 1 }
    default:
      return state
  }
}
```

#### IN:

```js
import reducer, { initialState } from './actions'
```

#### OUT:

```js
import reducer, { initialState } from './actions'

test('handle INCREMENT', () => {
  expect(actions.increment()).toEqual({ count: 0 })
})

test('handle DECREMENT', () => {
  expect(actions.decrement()).toEqual({ count: 0 })
})
```

And, Just change `{count: 0}` → `{count: 1}`.

### Usage

```
{
  ['s2s-reducer-test-case']
}
```

#### from

type: `string` <br>
required: true

reducer.js path

If you use `s2s`, you **don't** use this option.
