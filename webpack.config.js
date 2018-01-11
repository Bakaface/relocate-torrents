var path = require('path')
var shell = require('shelljs')

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
  plugins: [
    function () {
      this.plugin('done', () => {
        shell
          .mkdir(`${__dirname}/bin`)
        shell
          .echo('#!/usr/bin/env node\n')
          .cat(`${__dirname}/dist/bundle.js`)
          .to(`${__dirname}/bin/relocate-torrents`)
        shell.chmod(755, `${__dirname}/bin/relocate-torrents`)
      })
    },
  ]
}