const path = require('path')

module.exports = {
  entry: {
    index: './lib/index.js',
    MatomoTracker: './lib/MatomoTracker.js',
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    publicPath: '/lib/',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devtool: 'source-map',
}
