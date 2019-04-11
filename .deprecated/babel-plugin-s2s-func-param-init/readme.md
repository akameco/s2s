# babel-plugin-s2s-func-param-init

> s2s plugin: initialize variable with flowtype infomation

## Install

```
$ yarn add --dev babel-plugin-s2s-func-param-init
```

### Example

#### IN:

```js
// @flow

type A = { a: string, b: number }
function helloA(a: A) {}
```

#### OUT:

```js
// @flow
type A = { a: string, b: number }

function helloA({ a, b }) {}
```

### Usage

```
{
  ['s2s-func-param-init']
}
```
