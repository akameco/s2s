[![s2s](https://raw.githubusercontent.com/akameco/logos/master/s2s.png)](https://github.com/akameco/s2s)

[![Build Status](https://travis-ci.org/akameco/s2s.svg?branch=master)](https://travis-ci.org/akameco/s2s)
[![Coverage Status](https://coveralls.io/repos/github/akameco/s2s/badge.svg?branch=master)](https://coveralls.io/github/akameco/s2s?branch=master)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)


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
