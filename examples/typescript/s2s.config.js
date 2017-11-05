const tsHandler = require('s2s-ts-handler').default

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
