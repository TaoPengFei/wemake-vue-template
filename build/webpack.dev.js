'use strict'
process.env.NODE_ENV = 'development'

const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrors = require('friendly-errors-webpack-plugin')
const base = require('./webpack.base')
const _ = require('./utils')

const styleLoaders = []

// push loader for css files
_.cssProcessors.forEach(processor => {
  let loaders
  if (processor.loader === '') {
    loaders = ['postcss-loader']
  } else {
    loaders = ['postcss-loader', processor.loader]
  }
  styleLoaders.push(
    {
      test: processor.test,
      loaders: ['style-loader', _.cssLoader].concat(loaders)
    }
  )
})

module.exports = merge(base, {
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrors()
  ],
  module: {
    loaders: [
      ...styleLoaders
    ]
  }
})
