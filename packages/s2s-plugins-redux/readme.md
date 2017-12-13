# s2s-plugins-redux

> s2s plugins for redux

## Plugins

### babel-plugin-s2s-action-creater

### babel-plugin-s2s-action-root

### babel-plugin-s2s-action-types

### babel-plugin-s2s-reducer-case-creater

### babel-plugin-s2s-reducer-root

### babel-plugin-s2s-reducer-test-case

### babel-plugin-s2s-state-root

## Usage

s2s.config.js

```js
const plugins = require('s2s-plugins-redux')

module.exports = {
  watch: './**/*.js',
  plugins,
  templates: [
    { test: /containers\/.*\/index.js/, input: 'containers.js' },
    { test: /components\/.*\/index.js/, input: 'components.js' },
    { test: /components\/.*\/index.test.js/, input: 'component.test.js' },
    { test: /reducer.js/, input: 'reducer.js' },
    { test: /reducer.js/, input: 'reducer.test.js', output: 'reducer.test.js' },
    { test: /reducer.js/, input: 'actionTypes.js', output: 'actionTypes.js' },
    { test: /selectors.js/, input: 'selectors.js' },
    { test: /selectors.test.js/, input: 'selectors.test.js' },
    { test: /logic.js/, input: 'logic.js' },
  ],
}
```

### Examples

[s2s-examples/shopping-cart](https://github.com/akameco/s2s-examples/tree/master/shopping-cart)
