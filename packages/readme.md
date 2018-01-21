**help wanted** ドキュメントの英語化を手伝って頂けると嬉しいです 😇

モノレポ！そうです。モノレポで運用しています。

## Core

s2s の本体です。

* [s2s-cli](./s2s-cli)

### インストール

```
$ yarn add --dev s2s
```

## Handler

現在 BabelHandler をデフォルトのハンドラーとして利用しています。
Babel のバージョンは 6 です。

また、拡張子が`.ts`の場合、`s2s-handler-typescript`が選択されます。あなたが指定する必要はありません。

* [s2s-handler-babel](./s2s-handler-babel)
* [s2s-handler-babel-next](./s2s-handler-babel-next)
* [s2s-handler-typescript](./s2s-handler-typescript)
* [s2s-handler-css-to-flow](./s2s-handler-css-to-flow)

## Plugins

s2s 公式が提供している BabelPlugin です。

* [babel-plugin-s2s-action-creater](./babel-plugin-s2s-action-creater)
* [babel-plugin-s2s-action-root](./babel-plugin-s2s-action-root)
* [babel-plugin-s2s-action-types](./babel-plugin-s2s-action-types)
* [babel-plugin-s2s-initial-state-creater](./babel-plugin-s2s-initial-state-creater)
* [babel-plugin-s2s-jest-unit-test-case](./babel-plugin-s2s-jest-unit-test-case)
* [babel-plugin-s2s-reducer-case-creater](./babel-plugin-s2s-reducer-case-creater)
* [babel-plugin-s2s-reducer-root](./babel-plugin-s2s-reducer-root)
* [babel-plugin-s2s-reducer-test-case](./babel-plugin-s2s-reducer-test-case)
* [babel-plugin-s2s-state-root](./babel-plugin-s2s-state-root)
* [babel-plugin-s2s-variable-initializing](./babel-plugin-s2s-variable-initializing)
