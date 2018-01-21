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
