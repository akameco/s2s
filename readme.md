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
const prettier = require('prettier')

const prettierHook = (eventPath, code) => {
  if (path.extname(eventPath) === 'js') {
    return prettier.format(code, {
      semi: false,
      singleQuote: true,
      trailingComma: 'es5',
    })
  }
  return code
}

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
  after: [prettierHook],
}
```

### Run

```
$ npm run s2s
```


## License

MIT © [akameco](http://akameco.github.io)
