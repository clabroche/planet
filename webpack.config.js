const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  watch: process.env.WATCH ? true : false,
  output: {
    path: path.resolve(__dirname),
    filename: 'dist/bundle.js',
    library: 'Planet',
    libraryTarget: 'window',
    libraryExport: 'default'
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: './src/index.html',
        to: 'dist'
      }, {
          from: './src/index.css',
          to: 'dist'
        }, {
          from: './src/assets',
          to: 'dist/assets'
        },]
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin({
      include: /\.min\.js$/
    })]
  }

};