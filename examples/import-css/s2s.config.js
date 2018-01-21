const { DEFAULT_CONFIG: cssToFlow } = require('s2s-handler-css-to-flow')

module.exports = {
  watch: './**/*.css',
  plugins: [cssToFlow],
}
