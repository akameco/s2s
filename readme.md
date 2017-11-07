[![s2s](https://github.com/akameco/logos/blob/master/s2s/s2s-logo.png?raw=true)](https://github.com/akameco/s2s)

<hr>

[![Build Status](https://travis-ci.org/akameco/s2s.svg?branch=master)](https://travis-ci.org/akameco/s2s)
[![Coverage Status](https://coveralls.io/repos/github/akameco/s2s/badge.svg?branch=master)](https://coveralls.io/github/akameco/s2s?branch=master)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![MIT License](https://img.shields.io/npm/l/nps.svg?style=flat-square)](./license)
[![Donate](https://img.shields.io/badge/%EF%BC%84-support-green.svg?style=flat-square)](http://amzn.asia/bO78HzR)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](./CODE_OF_CONDUCT.md)
[![Examples](https://img.shields.io/badge/%F0%9F%92%A1-examples-8C8E93.svg?style=flat-square)](./examples)
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors)

## [日本語](https://github.com/akameco/s2s/tree/master/docs/ja)
(readmeの最新版は日本語です)

## Ultra-fast coding by AST assist

<img src="https://raw.githubusercontent.com/akameco/s2s-examples/master/media/demo.gif" />

See Examples [examples](./examples)

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
This is short example.
It is enough to know the power of s2s :)

It's a first example that s2s initialize variables with the type infomations in Flow.

[![https://gyazo.com/c6de73c7c9044520fbbca95881c2a927](https://i.gyazo.com/c6de73c7c9044520fbbca95881c2a927.gif)](https://gyazo.com/c6de73c7c9044520fbbca95881c2a927)

### Preparation

Clone the repository and install dependencies.

```
$ git clone --depth=1 git@github.com:akameco/s2s.git
$ cd examples/getting-started
$ yarn
// or npm install
```

### Usage

Check out `s2s.config.js` in the root of the project. This is a setting file.

`watch` set an direcotry that s2s watches, and `plugins` set an array of the plugins.

You can write easy the file if you are familer with webpack.

For more infomations, see [Config](./docs/en/config.md).

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
$ yarn run flow init # you have to run it before to run s2s
$ yarn run s2s
```

Opened `src/index.js` with your favorite editor, type `var user: User` and save it.

Would s2s generate default values?

It finishes Quick Start. Thanks!

See [Getting Started Exmaple](https://github.com/akameco/s2s-plugins/tree/master/examples/getting-started)

## Combine plugins

With combinations of some plugins, it makes s2s more useful.

This example is that s2s generates an constant of Action and an Action Creator, a Reducer, a test of Reducer when you wrote the definition of the type of Action.

![plugins](https://camo.qiitausercontent.com/2b3fc744eda2c6e569f437d8006c765c78bc9f20/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f31353331392f37306239386664642d373338622d646464322d663866352d3932343435353763643734322e676966)

More Info? See Examples.

## More Examples

Combination of Redux and Flow.
[Shopping Cart (redux+flowtype+s2s)](https://github.com/akameco/s2s-examples)

More Info? See Examples.

## Official Plugins

- [**babel-plugin-s2s-action-types**<br>generate redux action types](https://github.com/akameco/s2s/tree/master/packages/babel-plugin-s2s-action-types)
- [**babel-plugin-s2s-action-creater**<br>generate redux action creater](https://github.com/akameco/s2s/tree/master/packages/babel-plugin-s2s-action-creater)
- [**babel-plugin-s2s-action-root**<br>compose flow + redux action types](https://github.com/akameco/s2s/tree/master/packages/babel-plugin-s2s-action-root)
- [**babel-plugin-s2s-state-root**<br>compose flow + redux state types](https://github.com/akameco/s2s/tree/master/packages/babel-plugin-s2s-state-root)
- [**babel-plugin-s2s-reducer-root**<br>compose redux reducer](https://github.com/akameco/s2s/tree/master/packages/babel-plugin-s2s-reducer-root)
- [**babel-plugin-s2s-reducer-test-case**<br>create reducer test using switch/case](https://github.com/akameco/s2s/tree/master/packages/babel-plugin-s2s-reducer-test-case)

## Contributions

 For all contributions we are always welcome. and we are working with [all-contributors](https://github.com/kentcdodds/all-contributors)  Specifications in this repository.

If you contributed our project with writting a code and test, then type this command.

```
$ yarn run all-contributors <GitHub Username> code,test
```

If you contibuted our project with adding documents and fixing them, then type this command.

```
$ yarn run all-contributors <GitHub Username> doc
```

For more infomations, refer [all-contributors](https://github.com/kentcdodds/all-contributors).

We will be welcome your contributions!

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars2.githubusercontent.com/u/4002137?v=4" width="100px;"/><br /><sub><b>akameco</b></sub>](http://akameco.github.io)<br />[💻](https://github.com/akameco/s2s/commits?author=akameco "Code") [⚠️](https://github.com/akameco/s2s/commits?author=akameco "Tests") [💬](#question-akameco "Answering Questions") [🤔](#ideas-akameco "Ideas, Planning, & Feedback") [🚇](#infra-akameco "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars3.githubusercontent.com/u/2284908?v=4" width="100px;"/><br /><sub><b>elzup</b></sub>](https://elzup.com)<br />[🤔](#ideas-elzup "Ideas, Planning, & Feedback") [💻](https://github.com/akameco/s2s/commits?author=elzup "Code") | [<img src="https://avatars3.githubusercontent.com/u/84027?v=4" width="100px;"/><br /><sub><b>erukiti</b></sub>](http://www.amazon.co.jp/gp/registry/wishlist/JQ28X5KI9FRY)<br />[📝](#blog-erukiti "Blogposts") | [<img src="https://avatars2.githubusercontent.com/u/5019902?v=4" width="100px;"/><br /><sub><b>TANIGUCHI Masaya</b></sub>](https://ta2gch.github.io/)<br />[📖](https://github.com/akameco/s2s/commits?author=ta2gch "Documentation") |
| :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT © [akameco](http://akameco.github.io)
