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
const { hooks } = require('s2s')

const templateDir = path.resolve(__dirname, 'templates')

module.exports = {
  watch: path.resolve(__dirname, 'app'),
  plugins: [
    {
      test: /actionType.js/,
      plugin: 'action-type',
      output: 'actions.js',
    },
  ],
  templates: [
    {
      test: /reducer.js/,
      input: path.join(templateDir, 'reducer.js'),
    },
    {
      test: /reducer.test.js/,
      input: path.join(templateDir, 'reducer.test.js'),
    },
  ],
  afterHooks: [hooks.prettier({
    semi: false,
    singleQuote: true,
    trailingComma: 'es5',
  })],
}
```

### Run

```
$ npm run s2s
```


## License

MIT © [akameco](http://akameco.github.io)
