[![s2s](https://github.com/akameco/logos/blob/master/s2s/s2s-logo.png?raw=true)](https://github.com/akameco/s2s)

<hr>

[![Build Status](https://travis-ci.org/akameco/s2s.svg?branch=master)](https://travis-ci.org/akameco/s2s)
[![Coverage Status](https://coveralls.io/repos/github/akameco/s2s/badge.svg?branch=master)](https://coveralls.io/github/akameco/s2s?branch=master)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)


## Ultra-fast coding by AST assist

<img src="https://raw.githubusercontent.com/akameco/s2s-examples/master/media/demo.gif" />

See Examples [akameco/s2s-examples](https://github.com/akameco/s2s-examples)

## Concept

Monitor your coding and generate code in real time.

When the file names match, a single Babel plugin is executed and the formatted code is reflected in the editor.

- You can use any editor.
- Just Babel Plugin. No lock in.

<img src="https://github.com/akameco/logos/blob/master/s2s/s2s-concept.png?raw=true" height=600 />


## Articles
### 日本語

- [さよならボイラープレート。s2sによる高速reduxアプリケーション構築](https://qiita.com/akameco/items/e1489c6bbf3439ec6ca4)
- [s2s: reduxにおけるreducerのテスト。あなたがテストを書く必要はないかも知れない](https://qiita.com/akameco/items/66a2232df0e95e5bfe31)


## Users
[SSconnect/ssconnect]( https://github.com/SSconnect/ssconnect)

> If your company or project is using s2s, please open a PR and add yourself to this list (in alphabetical order please)

## Quick Start
This is super small example.
However Useful :)
It is that initializing variable with flow information.

[![https://gyazo.com/c6de73c7c9044520fbbca95881c2a927](https://i.gyazo.com/c6de73c7c9044520fbbca95881c2a927.gif)](https://gyazo.com/c6de73c7c9044520fbbca95881c2a927)

## Install

yarn:

```
$ yarn add --dev s2s
```

npm:

```
$ npm install --save-dev s2s
```

And install the babel plugin.

```
$ yarn add --dev babel-plugin-s2s-variable-initializing flow-bin
```


## Usage

create **`s2s.config.js`**

```js
module.exports = {
  watch: './**/*.js',
  plugins: [
    {
      test: /.*.js$/,
      plugin: ['s2s-variable-initializing'],
    },
  ],
}
```

### Run

```
$ yarn run flow init
$ yarn run flow
$ yarn run s2s
```

See [Getting Started Exmaple](https://github.com/akameco/s2s-plugins/tree/master/examples/getting-started)

## Combine plugins
![plugins](https://camo.qiitausercontent.com/2b3fc744eda2c6e569f437d8006c765c78bc9f20/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f31353331392f37306239386664642d373338622d646464322d663866352d3932343435353763643734322e676966)

More Info? See Examples.

## More Examples

[Shopping Cart (redux+flowtype+s2s)](https://github.com/akameco/s2s-examples)


## Official Plugins

- [**babel-plugin-s2s-action-types**<br>generate redux action types](https://github.com/akameco/s2s-plugins/tree/master/packages/babel-plugin-s2s-action-types)
- [**babel-plugin-s2s-action-creater**<br>generate redux action creater](https://github.com/akameco/s2s-plugins/tree/master/packages/babel-plugin-s2s-action-creater)
- [**babel-plugin-s2s-action-root**<br>compose flow + redux action types](https://github.com/akameco/s2s-plugins/tree/master/packages/babel-plugin-s2s-action-root)
- [**babel-plugin-s2s-state-root**<br>compose flow + redux state types](https://github.com/akameco/s2s-plugins/tree/master/packages/babel-plugin-s2s-state-root)
- [**babel-plugin-s2s-reducer-root**<br>compose redux reducer](https://github.com/akameco/s2s-plugins/tree/master/packages/babel-plugin-s2s-reducer-root)
- [**babel-plugin-s2s-reducer-root**<br>create reducer test using switch/case](https://github.com/akameco/s2s-plugins/tree/master/packages/babel-plugin-s2s-reducer-test-case)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars2.githubusercontent.com/u/4002137?v=4" width="100px;"/><br /><sub>akameco</sub>](http://akameco.github.io)<br />[💻](https://github.com/akameco/s2s/commits?author=akameco "Code") [⚠️](https://github.com/akameco/s2s/commits?author=akameco "Tests") [💬](#question-akameco "Answering Questions") [🤔](#ideas-akameco "Ideas, Planning, & Feedback") [🚇](#infra-akameco "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars3.githubusercontent.com/u/2284908?v=4" width="100px;"/><br /><sub>elzup</sub>](https://elzup.com)<br />[🤔](#ideas-elzup "Ideas, Planning, & Feedback") [💻](https://github.com/akameco/s2s/commits?author=elzup "Code") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT © [akameco](http://akameco.github.io)
