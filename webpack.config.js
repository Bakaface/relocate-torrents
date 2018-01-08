var path = require('path');

module.exports = {
  entry: [
    './src/main.js'
  ],
  target: 'node',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader'
      }
    ]
  },
}