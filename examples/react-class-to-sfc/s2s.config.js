module.exports = {
  plugins: [
    {
      test: /.*.js$/,
      plugin: ['transform-react-pure-class-to-function'],
    },
  ],
}
