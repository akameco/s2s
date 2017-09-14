[![s2s](https://raw.githubusercontent.com/akameco/logos/master/s2s.png)](https://github.com/akameco/s2s)

# [![Build Status](https://travis-ci.org/akameco/s2s.svg?branch=master)](https://travis-ci.org/akameco/s2s)


## Install

```
$ npm install --save-dev s2s
```


## Usage

s2s.config.js

```js
const path = require('path')
const s2s = require('s2s')

module.exports = {
  watch: './**/*.js',
  plugins: [
    {
      test: /actionTypes.js$/,
      output: 'actions.js',
      plugin: ['create-redux-action-func', { actionTypes: 'actionTypes.js' }]
    }
  ],
  templatesDir: 'templates',
  templates: [
    { test: /reducer.js/, input: 'reducer.js' },
    { test: /reducer.test.js/, input: 'reducer.test.js' }
  ],
  afterHooks: [s2s.hooks.prettier()]
}
```

### Run

```
$ npm run s2s
```


## License

MIT © [akameco](http://akameco.github.io)
