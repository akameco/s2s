module.exports = {
  watch: './**/*.js',
  plugins: [
    {
      test: /.*.js$/,
      plugin: ['fizzbuzz'],
    },
  ],
}
