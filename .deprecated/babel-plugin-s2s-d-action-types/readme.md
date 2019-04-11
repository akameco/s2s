# babel-plugin-s2s-d-action-types

> s2s plugin for `d`

## Install

```
$ yarn add --dev babel-plugin-s2s-d-action-types
```

### Example

#### IN:

```js
// @flow
import * as constants from './constants.js'

export type Action = Increment
```

#### OUT:

```js
// @flow
import * as constants from './constants.js'

export type Increment = {
  type: typeof constants.INCREMENT,
}

export type Action = Increment
```

### Usage

```
{
  ['s2s-d-action-types']
}
```
