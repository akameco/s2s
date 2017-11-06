**help wanted** ドキュメントの英語化を手伝って頂けると嬉しいです😇

モノレポ！そうです。モノレポで運用しています。

## Core
s2sの本体です。

- [s2s-cli](./s2s-cli)

### インストール

```
$ yarn add --dev s2s
```

## Handler
現在BabelHandlerをデフォルトのハンドラーとして利用しています。
Babelのバージョンは6です。

- [s2s-handler-babel](./s2s-handler-babel)
- [s2s-handler-typescript](./s2s-handler-typescript)

## Plugins
s2s公式が提供しているBabelPluginです。

- [babel-plugin-s2s-action-creater](./babel-plugin-s2s-action-creater)
- [babel-plugin-s2s-action-root](./babel-plugin-s2s-action-root)
- [babel-plugin-s2s-action-types](./babel-plugin-s2s-action-types)
- [babel-plugin-s2s-initial-state-creater](./babel-plugin-s2s-initial-state-creater)
- [babel-plugin-s2s-jest-unit-test-case](./babel-plugin-s2s-jest-unit-test-case)
- [babel-plugin-s2s-reducer-case-creater](./babel-plugin-s2s-reducer-case-creater)
- [babel-plugin-s2s-reducer-root](./babel-plugin-s2s-reducer-root)
- [babel-plugin-s2s-reducer-test-case](./babel-plugin-s2s-reducer-test-case)
- [babel-plugin-s2s-state-root](./babel-plugin-s2s-state-root)
- [babel-plugin-s2s-variable-initializing](./babel-plugin-s2s-variable-initializing)
