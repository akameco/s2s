# babel-plugin-s2s-reducer-case-creater

> s2s plugin: create reducr case pattern using actionTypes

## Install

```
$ npm install --save-dev babel-plugin-s2s-reducer-case-creater
```

### Example

#### actionTypes.js

```js
export const Actions = {
  INCREMENT,
  DECREMENT,
}
```

#### IN:

```js
export default function(state: State = initialState, action) {
  switch (action.type) {
    case Actions.INCREMENT:
      return { ...state, count: state + 1 }

    default:
      return state
  }
}
```

#### OUT:

```js
export default function(state: State = initialState, action) {
  switch (action.type) {
    case Actions.DECREMENT:
      return {
        ...state,
      }

    case Actions.INCREMENT:
      return { ...state, count: state + 1 }

    default:
      return state
  }
}
```

And, Just change `{...state}` → `{...state, count: staet - 1}`.

### Usage

```
{
  ['s2s-reducer-case-creater']
}
```

#### from

type: `string` <br>
required: true

actionTypes.js path

If you use `s2s`, you **don't** use this option. s2s handle it automatically.
