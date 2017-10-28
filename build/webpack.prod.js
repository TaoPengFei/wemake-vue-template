'use strict'
process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const rm = require('rimraf')
const base = require('./webpack.base')
const pkg = require('../package')
const _ = require('./utils')
const config = require('./config')

// remove dist folder in web app mode
rm.sync('dist/*')

// extract css in standalone css files
const styleLoaders = []

_.cssProcessors.forEach(processor => {
  let loaders
  if (processor.loader === '') {
    loaders = ['postcss-loader']
  } else {
    loaders = ['postcss-loader', processor.loader]
  }
  styleLoaders.push({
    test: processor.test,
    loader: ExtractTextPlugin.extract({
      use: [_.cssLoader].concat(loaders),
      fallback: 'style-loader'
    })
  })
})

module.exports = merge(base, {
  output: {
    // use hash filename to support long-term caching
    filename: '[name].[chunkhash:8].js'
  },

  // use source-map in web app mode
  devtool: 'source-map',

  module: {
    loaders: [
      ...styleLoaders
    ]
  },

  plugins: [
    new ProgressPlugin(),
    new ExtractTextPlugin('styles.[contenthash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    // extract vendor chunks
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => {
        return module.resource && /\.(js|css|es6)$/.test(module.resource) && module.resource.indexOf('node_modules') !== -1
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    })
  ],

  // minimize webpack output
  stats: {
    // Add children information
    children: false,
    // Add chunk information (setting this to `false` allows for a less verbose output)
    chunks: false,
    // Add built modules information to chunk information
    chunkModules: false,
    chunkOrigins: false,
    modules: false
  }
})
