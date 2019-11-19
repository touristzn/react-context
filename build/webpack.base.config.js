const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const es3ifyPlugin = require('es3ify-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HappyPack = require('happypack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const os = require('os')
const path = require('path')
const glob = require('glob')
const chalk = require('chalk')

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const defines = require('../config/define.conf')

const isProd = process.env.NODE_ENV === 'production'
const publicPath = isProd ? '/h5/' : '/'

/**
 * 获取绝对路径
 */
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

/**
 * 获取entry文件夹下的页面路径
 */
function getEntry() {
  let entry = {};
  glob.sync('./app/entry/*.jsx').forEach(ele => {
    let name = ele.split('/').pop().replace(/\.jsx?/, '');
    entry[name] = [ele];
  })
  return entry;
}

module.exports = {
  entry: getEntry(),

  output: {
    path: path.resolve(`dist${  publicPath}`),
    publicPath,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'happypack/loader?id=happy-babel-js',
        exclude: '/node_modules/',
        include: [resolve('app')]
      },

      {
        test: /\.(jpe?g|png|gif|svg)(\?.*)?$/,
        include: [resolve('app/static')],
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name]-[hash:5].[ext]',
              limit: 10000,
            }
          }
        ]
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      {
        test: /\.less$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {// postcss需要放在less前
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: [
                require('postcss-preset-env')()
              ]
            }
          },
          'less-loader',
        ],
      },

      {
        test: /\.(eot|ttf|woff)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'iconfont/[name]-[hash:5].[ext]',
              limit: 5000
            }
          }
        ]
      }
    ]
  },

  performance: {
    hints: "warning",
    maxEntrypointSize: 5000000,
    maxAssetSize: 3000000
  },

  resolve: {
    extensions: ['.js', '.jsx', '.less']
  },

  optimization: {
    namedChunks: true,
    runtimeChunk: { name: 'manifest' },
    minimizer: !isProd
    ? []
    : [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: !isProd
        }),
        new OptimizeCSSAssetsPlugin()
      ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        styles: {
          name: 'styles',
          test: /\.(less|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    },
  },

  plugins: [
    new HappyPack({
      id: 'happy-babel-js',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool
    }),
    
    new ProgressBarPlugin({
      format: ' build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    }),

    new es3ifyPlugin(),

    new webpack.DefinePlugin(defines),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[contentHash:5].css',
    }),
  ]
}

/**
 * 配置页面
 */
const entryObj = getEntry();
Object.keys(entryObj).forEach(function html(name){
  module.exports.plugins.push(
    new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: `./app/template/${name}.ejs`,
      // favicon: './app/static/images/logo.png',
      minify: {
        collapseWhitespace: true, // 删除空白符与换行符
        removeComments: true, // 移除HTML中的注释
        minifyJS: true, // 压缩html里的js
        minifyCSS: true, // 压缩内联css
      },
      hash: true,
      inject: true,
      chunks: [name, 'vendor', 'manifest', 'styles'],
      chunksSortMode: 'none'
    })
  )
})