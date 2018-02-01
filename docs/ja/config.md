## Config の設定

`s2s.config.js`をプロジェクトのルートに配置します。基本的に必要となる項目は、`plugins`と`templates`の 2 つです。

```js
module.exports = {
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

また、ejs 形式の埋め込みをサポートしており、デフォルトでは`FILENAME`でファイル名が、`DIRNAME`で親ディレクトリ名が渡されます。

Hello/index.js

```js
console.log("<%= DIRNAME %>")

↓ ↓ ↓

console.log("Hello")
```

### handlerMapper

`{ [extensions: string]: Handler }`

必須ではありません。ハンドラの拡張子を指定することでそのハンドラを実行します。未指定の場合、デフォルトで `.js` `.jsx` `.ts` `.tsx` をそれぞれ処理します。

```js
  handlerMapper: {
    '*.ts': typescriptHandler
  }
```

### afterHook

必須ではありません。
hook の配列を指定します。
handler が実行された際に、指定された hook が実行されます。

```js
export type AfterHook = (code: Code, path: Path) => Code
```

### prettier

必須ではありません。デフォルトで `true` が指定されています。
true が指定されていると、 [prettierHook](https://github.com/akameco/s2s/tree/master/packages/s2s-hook-prettier) が有効になります。
