var path = require('path');

module.exports = {
  entry: [
    './index.js'
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