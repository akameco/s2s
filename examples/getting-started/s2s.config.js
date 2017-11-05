module.exports = {
  watch: './**/*.js',
  plugins: [
    {
      test: /.*.js$/,
      plugin: ['s2s-variable-initializing'],
    },
  ],
}
