// @flow
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
