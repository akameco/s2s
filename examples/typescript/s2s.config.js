const tsHandler = require('s2s-handler-typescript').default

module.exports = {
  watch: './**/*.ts',
  plugins: [
    {
      test: /.*.ts$/,
      plugin: ['fizzbuzz'],
      handler: tsHandler,
    },
  ],
}
