'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./config')
const _ = require('./utils')

module.exports = {
  entry: {
    client: './client/client-entry.ts'
  },
  output: {
    path: _.outputPath,
    filename: '[name].js',
    publicPath: config.publicPath,
    // Point sourcemap entries to original disk location
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath),
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.css', '.json'],
    alias: {
      vue: 'vue/dist/vue.js'
    },
    modules: [
      _.cwd('node_modules')
    ]
  },
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: /(node_modules)/,
        options: {
          typeCheck: true,
          tsConfigFile: 'tsconfig.json'
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: true
        }
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: config.title,
      template: path.resolve(__dirname, 'index.html'),
      filename: _.outputIndexPath
    }),
    new webpack.LoaderOptionsPlugin(_.loadersOptions()),
    new CopyWebpackPlugin([
      {
        from: _.cwd('./client/assets'),
        // to the roor of dist path
        to: './'
      }
    ])
  ],
  target: _.target
}
