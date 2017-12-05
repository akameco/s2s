## Configの設定
`s2s.config.js`をプロジェクトのルートに配置します。
基本的に必要となる項目は、`watch`と`plugins`と`templates`の3つです。

```js
module.exports = {
  watch: './**/*.js', // string
  plugins: [],
  templates: [],
}
```

### watch
対象となるファイルをGlobパターンで指定します。

### plugins
オブジェクトの配列を指定します。
必須項目は、`test`です。
`test`は、対象とするファイルを正規表現で指定します。
`plugin`はそれぞれのハンドラーで指定されたオプションを指定します。
デフォルトでは、babelのpluginを指定します。
なので、`.babelrc`の指定方法と同様にプラグイン名、オプションが必要な場合は、配列で渡すことが可能です。

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
テンプレートからファイルをコピーします。
必要項目は、`test`と`input`です。
`test`は、pluginsと同様にファイルパスを正規表現で指定します。
inputは`templates`ディレクトリにあるファイルを指定します。

```js
type Template = {|
  test: RegExp | string | string[],
  input: Path,
  output?: Path,
|}
```

### handlermapper
`{ [extensions: string]: Handler }`

必須ではありません。
ハンドラの拡張子を指定することでそのハンドラを実行します。
未指定の場合、デフォルトで `.js` `.jsx` `.ts` `.tsx` をそれぞれ処理します。

```js
  handlerMapper: {
    '*.ts': typescriptHandler
  }
```
