[![s2s](https://github.com/akameco/logos/blob/master/s2s/s2s-logo.png?raw=true)](https://github.com/akameco/s2s)

<hr>

[![Build Status](https://travis-ci.org/akameco/s2s.svg?branch=master)](https://travis-ci.org/akameco/s2s)
[![Coverage Status](https://coveralls.io/repos/github/akameco/s2s/badge.svg?branch=master)](https://coveralls.io/github/akameco/s2s?branch=master)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

## ASTのパワーによる超高速コーディング

<img src="https://raw.githubusercontent.com/akameco/s2s-examples/master/media/demo.gif" />

詳しくは、[examples](https://github.com/akameco/s2s/tree/master/examples)を見てください。

## コンセプト
ソースコードからソースコードへのリアルタイムコード生成。  
あなたのエディタを監視して、リアルタイムにコードを生成します。

変更したファイル名が一致すると、単一のBabelPluginを実行し、それをコードへと反映します。

<img src="https://github.com/akameco/logos/blob/master/s2s/s2s-concept.png?raw=true" height=600 />

### 利点

- エディタにロックインされません。AtomでもVSCodeでも使えます。
- s2s自体にロックインされません。単なるBabelPluginを書くだけで拡張できます。


## Articles
### 日本語

- [さよならボイラープレート。s2sによる高速reduxアプリケーション構築](https://qiita.com/akameco/items/e1489c6bbf3439ec6ca4)
- [s2s: reduxにおけるreducerのテスト。あなたがテストを書く必要はないかも知れない](https://qiita.com/akameco/items/66a2232df0e95e5bfe31)


## Users
[SSconnect/ssconnect]( https://github.com/SSconnect/ssconnect)

> もし、あなたの会社やプロジェクトでs2sを使っている場合は、プルリクエストを送ってリストに追加してくださると嬉しいです。(アルファベット順でお願いします)

## クイックスタート
では、本当に小さいサンプルから始めましょう。
しかし、s2sの力を知るには十分です。

はじめに取り組むのは、以下のように、Flowの型情報を利用して、変数の初期化を自動で行うサンプルです。

[![https://gyazo.com/c6de73c7c9044520fbbca95881c2a927](https://i.gyazo.com/c6de73c7c9044520fbbca95881c2a927.gif)](https://gyazo.com/c6de73c7c9044520fbbca95881c2a927)

### 準備

レポジトリをクローンし、依存をインストールしてください。

```
$ git clone --depth=1 git@github.com:akameco/s2s.git
$ cd examples/getting-started
$ yarn
// or npm install
```

### 使い方

ルートにある`s2s.config.js`を確認してください。
これが、s2sの設定ファイルです。
watchで監視するディレクトリを指定し、pluginsは配列を指定します。
もし、webpackに馴染みがあれば似たように書けるでしょう。
詳しい設定については、[Config](https://github.com/akameco/s2s/tree/master/docs/ja/config.md)を確認してください。

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

s2sの前にflowを実行しておく必要があります。

```
$ yarn run flow
```

そして、s2sを起動します。

```
$ yarn run s2s
```

`src/index.js`をエディタで開いて、`var user: User`と入力し保存してください。
初期値が自動生成されましたか？

これで、クリックスタートを終わります。
ご苦労様でした。

## プラグイン
### プラグインを組み合わせる
複数のプラグインを組みわせると、より力を発揮します。  
以下の例は、Actionの型を定義すると、Actionの定数、アクションクリエイター、reducer、reducerのテストをそれぞれ生成します。

![plugins](https://camo.qiitausercontent.com/2b3fc744eda2c6e569f437d8006c765c78bc9f20/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f31353331392f37306239386664642d373338622d646464322d663866352d3932343435353763643734322e676966)

もっと多くの情報が必要ですか？ Examplesを確認してください。

### もっとExamples

reduxとflowtypeを組み合わせた例。

[ショッピングカート (redux+flowtype+s2s)](https://github.com/akameco/s2s/tree/master/examples/shopping-cart)


### オフィシャルプラグイン

- [**babel-plugin-s2s-action-types**<br>generate redux action types](https://github.com/akameco/s2s/tree/master/packages/babel-plugin-s2s-action-types)
- [**babel-plugin-s2s-action-creater**<br>generate redux action creater](https://github.com/akameco/s2s/tree/master/packages/babel-plugin-s2s-action-creater)
- [**babel-plugin-s2s-action-root**<br>compose flow + redux action types](https://github.com/akameco/s2s/tree/master/packages/babel-plugin-s2s-action-root)
- [**babel-plugin-s2s-state-root**<br>compose flow + redux state types](https://github.com/akameco/s2s/tree/master/packages/babel-plugin-s2s-state-root)
- [**babel-plugin-s2s-reducer-root**<br>compose redux reducer](https://github.com/akameco/s2s/tree/master/packages/babel-plugin-s2s-reducer-root)
- [**babel-plugin-s2s-reducer-test-case**<br>create reducer test using switch/case](https://github.com/akameco/s2s/tree/master/packages/babel-plugin-s2s-reducer-test-case)
