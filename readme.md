[![s2s](https://raw.githubusercontent.com/akameco/logos/master/s2s.png)](https://github.com/akameco/s2s)

[![Build Status](https://travis-ci.org/akameco/s2s.svg?branch=master)](https://travis-ci.org/akameco/s2s)
[![Coverage Status](https://coveralls.io/repos/github/akameco/s2s/badge.svg?branch=master)](https://coveralls.io/github/akameco/s2s?branch=master)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)


## Ultra-fast coding by AST assist

<img src="https://raw.githubusercontent.com/akameco/s2s-examples/master/media/demo.gif" />

See Examples [akameco/s2s-examples](https://github.com/akameco/s2s-examples)

## Quick Start

## Install

#### yarn:
```
$ yarn add --dev s2s
```

#### npm:
```
$ npm install --save-dev s2s
```

And install the babel plugin as well.

```
$ yarn add --dev babel-plugin-s2s-action-creater babel-plugin-s2s-action-types
```


## Usage

create **`s2s.config.js`**

```js
module.exports = {
  watch: './**/*.js',
  plugins: [
    {
      test: /actionTypes.js$/,
      plugin: ['s2s-action-types', { removePrefix: 'src/containers' }],
    },
    {
      test: /actionTypes.js$/,
      output: 'actions.js',
      plugin: ['s2s-action-creater'],
    },
  ],
  templates: [
    { test: /reducer.js/, input: 'reducer.js' },
  ],
}
```

### Run

```
$ npm run s2s
```


## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars2.githubusercontent.com/u/4002137?v=4" width="100px;"/><br /><sub>akameco</sub>](http://akameco.github.io)<br />[💻](https://github.com/akameco/s2s/commits?author=akameco "Code") [⚠️](https://github.com/akameco/s2s/commits?author=akameco "Tests") [💬](#question-akameco "Answering Questions") [🤔](#ideas-akameco "Ideas, Planning, & Feedback") | [<img src="https://avatars3.githubusercontent.com/u/2284908?v=4" width="100px;"/><br /><sub>elzup</sub>](https://elzup.com)<br />[🤔](#ideas-elzup "Ideas, Planning, & Feedback") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT © [akameco](http://akameco.github.io)
