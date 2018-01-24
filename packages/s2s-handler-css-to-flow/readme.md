# s2s-handler-css-to-flow

## Config

`s2s.config.js`

```js
const handlerCssToFlow = require('s2s-handler-css-to-flow').default

module.exports = {
  watch: './**/*.css',
  plugins: [
    {
      test: /.*.css$/,
      handler: handlerCssToFlow,
      output: '[name].css.flow',
    },
  ],
}
```

or use `DEFAULT_CONFIG`

```js
const { DEFAULT_CONFIG } = require('s2s-handler-css-to-flow')

module.exports = {
  watch: './**/*.css',
  plugins: [DEFAULT_CONFIG],
}
```
