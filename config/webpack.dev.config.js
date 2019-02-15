const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    filename: 'js/[name].[hash:5].js'
  },

  plugins: [
    //定义环境变量,并且设置的process.env.NODE_ENV是全局变量，可以在页面中引用，
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
})