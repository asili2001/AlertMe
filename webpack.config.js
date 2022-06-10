module.exports = {
  module: {
    rules: [
      {
        test: /\.(ogg|mp3|wav|m4a)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ],
  },
};