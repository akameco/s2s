# babel-plugin-s2s-reducer-root

> s2s plugin: compose state types


## Install

```
$ npm install --save-dev babel-plugin-s2s-reducer-root
```

### Example

#### IN:

```
```


#### OUT:

```
// @flow
import { combineReducers } from 'redux';
import App from "../__fixtures__/app/reducer";
import Bob from "../__fixtures__/bob/reducer";

export default combineReducers({
  App,
  Bob
});
```


### Usage

```
{
  ['s2s-reducer-root', {
    input: 'containers/**/reducer.js',
    output: 'reducer.js',
    globOptions: {}
  }]
}
```

#### input

type: `string` <br>
required: true

glob pattern.

#### output

type: `string` <br>
required: true

outputh path.

#### globOptions

See https://github.com/isaacs/node-glob#options


#### combineReducers

type: `string` <br>
required: false <br>
defualt: 'redux'

combineReducers module/path name.

`import { combineReducers } from './myCombineReducer'`
