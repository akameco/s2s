module.exports = {
  plugins: [
    {
      test: /.*.js$/,
      plugin: ['babel-plugin-transform-react-class-to-function'],
    },
  ],
}
