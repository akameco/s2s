TODO: 英語化

## Config の設定

`s2s.config.js`をプロジェクトのルートに配置します。基本的に必要となる項目は、`watch`と`plugins`と`templates`の 3 つです。

```js
module.exports = {
  watch: './**/*.js', // default
  plugins: [],
  templates: [],
}
```

### watch

対象となるファイルを Glob パターンで指定します。デフォルトは`./**/*.js`で`js`を対象に取ります。

### plugins

オブジェクトの配列を指定します。必須項目は、`test`です。
`test`は、対象とするファイルを正規表現で指定します。
`plugin`はそれぞれのハンドラーで指定されたオプションを指定します。デフォルトでは、babel の plugin を指定します。なので、`.babelrc`の指定方法と同様にプラグイン名、オプションが必要な場合は、配列で渡すことが可能です。

```js
type EventType = 'add' | 'change' | 'unlink'
type Only = EventType[]

type Plugin = {|
  test: RegExp | string | string[],
  plugin?: *,
  only?: Only,
  input?: FileName,
  output?: FileName,
|}
```

### templates

テンプレートからファイルをコピーします。必要項目は、`test`と`input`です。
`test`は、plugins と同様にファイルパスを正規表現で指定します。
input は`templates`ディレクトリにあるファイルを指定します。

```js
type Template = {|
  test: RegExp | string | string[],
  input: Path,
  output?: Path,
|}
```

### handlerMapper

`{ [extensions: string]: Handler }`

This field optional.
Run handler corresponding to extension.
If unspecified, run `.js` `.jsx` `.ts` `.tsx` by default.

```js
  handlerMapper: {
    '*.ts': typescriptHandler
  }
```

### afterHook

This field optional.
Configure array of hooks.
When run handler, execute hooks.

```js
export type AfterHook = (code: Code, path: Path) => Code
```

### prettier

This field optional.
default value is `true` .
If configure `true`, enable [prettierHook](https://github.com/akameco/s2s/tree/master/packages/s2s-hook-prettier) hook.
