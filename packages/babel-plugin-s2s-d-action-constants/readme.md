# babel-plugin-s2s-d-action-constants

> s2s plugin for `d`

## Install

```
$ yarn add --dev babel-plugin-s2s-d-action-constants
```

### Example

#### IN:

```js
// @flow
export type Action = Increment | Decrement
```

#### OUT:

```js
// @flow
export const INCREMENT: 'INCREMENT' = 'INCREMENT'
export const DECREMENT: 'DECREMENT' = 'DECREMENT'
```

### With prefix

`export S2S_ACTION_CONSTANTS_PREFIX=app`

```js
// @flow
export type Action = Increment | Decrement
```

#### OUT:

```js
// @flow
export const INCREMENT: 'app/INCREMENT' = 'app/INCREMENT'
export const DECREMENT: 'app/DECREMENT' = 'app/DECREMENT'
```

### Usage

```
{
  ['s2s-d-action-constants']
}
```
