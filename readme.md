[![s2s](https://github.com/akameco/logos/blob/master/s2s/s2s-logo.png?raw=true)](https://github.com/akameco/s2s)

<hr>

[![Build Status](https://travis-ci.org/akameco/s2s.svg?branch=master)](https://travis-ci.org/akameco/s2s)
[![Coverage Status](https://coveralls.io/repos/github/akameco/s2s/badge.svg?branch=master)](https://coveralls.io/github/akameco/s2s?branch=master)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Join the chat at https://gitter.im/s2s-js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/s2s-js/Lobby)


## Ultra-fast coding by AST assist

<img src="https://raw.githubusercontent.com/akameco/s2s-examples/master/media/demo.gif" />

See Examples [akameco/s2s-examples](https://github.com/akameco/s2s-examples)

## Concept

Monitor your coding and generate code in real time.  

When the file names match, a single Babel plugin is executed and the formatted code is reflected in the editor.

- You can use any editor.
- Just Babel Plugin. No lock in.

<img src="https://github.com/akameco/logos/blob/master/s2s/s2s-concept.png?raw=true" height=600 />

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


## Examples

[Shopping Cart (redux+flowtype+s2s)](https://github.com/akameco/s2s-examples)


## Plugins


- [**babel-plugin-s2s-action-types**<br>generate redux action types](https://github.com/akameco/s2s-plugins/tree/master/packages/babel-plugin-s2s-action-types)
- [**babel-plugin-s2s-action-creater**<br>generate redux action creater](https://github.com/akameco/s2s-plugins/tree/master/packages/babel-plugin-s2s-action-creater)
- [**babel-plugin-s2s-action-root**<br>compose flow + redux action types](https://github.com/akameco/s2s-plugins/tree/master/packages/babel-plugin-s2s-action-root)
- [**babel-plugin-s2s-state-root**<br>compose flow + redux state types](https://github.com/akameco/s2s-plugins/tree/master/packages/babel-plugin-s2s-state-root)
- [**babel-plugin-s2s-reducer-root**<br>compose redux reducer](https://github.com/akameco/s2s-plugins/tree/master/packages/babel-plugin-s2s-reducer-root)
- [**babel-plugin-s2s-reducer-root**<br>create reducer test using switch/case](https://github.com/akameco/s2s-plugins/tree/master/packages/babel-plugin-s2s-reducer-test-case)

## Articles
### 日本語

- [さよならボイラープレート。s2sによる高速reduxアプリケーション構築](https://qiita.com/akameco/items/e1489c6bbf3439ec6ca4)
- [s2s: reduxにおけるreducerのテスト。あなたがテストを書く必要はないかも知れない](https://qiita.com/akameco/items/66a2232df0e95e5bfe31)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars2.githubusercontent.com/u/4002137?v=4" width="100px;"/><br /><sub>akameco</sub>](http://akameco.github.io)<br />[💻](https://github.com/akameco/s2s/commits?author=akameco "Code") [⚠️](https://github.com/akameco/s2s/commits?author=akameco "Tests") [💬](#question-akameco "Answering Questions") [🤔](#ideas-akameco "Ideas, Planning, & Feedback") | [<img src="https://avatars3.githubusercontent.com/u/2284908?v=4" width="100px;"/><br /><sub>elzup</sub>](https://elzup.com)<br />[🤔](#ideas-elzup "Ideas, Planning, & Feedback") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT © [akameco](http://akameco.github.io)
