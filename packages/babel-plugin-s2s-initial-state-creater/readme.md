# babel-plugin-s2s-initial-state-creater

> s2s plugin: create initial-state from flow info

## Install

```
$ npm install --save-dev babel-plugin-s2s-initial-state-creater
```

### Example

#### IN:

```js
// @flow
type Count = number
type State = { count: Count, isLoading: boolean }

const initialState: State = {}
```

#### OUT:

```js
// @flow
type Count = number
type State = { count: Count, isLoading: boolean }

const initialState: State = { count: 0, isLoading: false }
```

### Usage

```
{
  ['s2s-initial-state-creater']
}
```

### Options

#### from

type: `string` <br>
required: true

Set target.js path

If you use `s2s`, you **don't** use this option. s2s handle it automatically.
