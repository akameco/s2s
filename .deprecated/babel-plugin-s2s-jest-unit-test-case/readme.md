# babel-plugin-s2s-jest-unit-test-case

> s2s plugin: create jest test case from source

## Install

```
$ npm install --save-dev babel-plugin-s2s-jest-unit-test-case
```

### Example

#### target.js

```js
export function sum(a, b) {
  return a + b
}
```

#### IN:

```js
// this is test file
```

#### OUT:

```js
// this is test file
import { sum } from './target'

test('sum', () => {
  const result = sum()
  expect(result).toBe(null)
})
```

### Options

#### from

type: `string` <br>
required: true

Set target.js path

If you use `s2s`, you **don't** use this option. s2s handle it automatically.
