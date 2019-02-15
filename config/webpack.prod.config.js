const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpack = require('clean-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config')

const path = require('path')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash:5].js',
    chunkFilename: 'js/[name].[chunkhash:5].js'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new UglifyJsPlugin({
      uglifyOptions: {
        ie8: true,
        warnings: false,
        output: {
          comments: false
        }
      },
      sourceMap: false,
      parallel: true,
      cache: true
    }),

    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),

    //清除打包目录
    new CleanWebpack(path.resolve(__dirname, 'dist')),

    new webpack.NoEmitOnErrorsPlugin(),
  ]
})