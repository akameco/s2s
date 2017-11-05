# babel-plugin-s2s-variable-initializing

> s2s plugin: initialize variable with flowtype infomation

## Install

```
$ npm install --save-dev babel-plugin-s2s-variable-initializing
```

### Example

#### IN:

```js
// @flow
type S = { a: number }
var a: S
```

#### OUT:

```js
// @flow
type S = { a: number }
var a: S = { a: 0 }
```

### Usage

```
{
  ['s2s-variable-initializing']
}
```
