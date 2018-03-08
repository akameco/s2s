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

### Usage

```
{
  ['s2s-d-action-constants']
}
```
