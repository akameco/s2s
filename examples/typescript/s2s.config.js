module.exports = {
  watch: './**/*.ts',
  plugins: [
    {
      test: /.*.ts$/,
      plugin: ['fizzbuzz'],
    },
  ],
}
