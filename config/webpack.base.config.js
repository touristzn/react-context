const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const es3ifyPlugin = require('es3ify-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const path = require('path')
const glob = require('glob')

const isProd = process.env.NODE_ENV === 'production'
const publicPath = isProd ? '/h5/' : '/'

module.exports = {
  entry: getEntry(),

  output: {
    path: path.resolve(`dist${  publicPath}`),
    publicPath,
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src'],
              minimize: true,
              removeComments: false,
              collapseWhitespace: false,
              removeAttributeQuotes: false,
              interpolate: 'require',
            },
          },
        ]
      },
      
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
        include: [resolve('app')]
      },

      {
        test: /\.(jpe?g|png|gif|svg)(\?.*)?$/,
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
                require('postcss-cssnext')()
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
        new UglifyJsPlugin({
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
    new es3ifyPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[contentHash:5].css',
    }),
  ]
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
        collapseWhitespace:true,
      },
      hash: true,
      inject: true,
      chunks: [name, 'vendor', 'manifest', 'styles'],
      chunksSortMode: 'none'
    })
  )
})

/**
 * 获取绝对路径
 */
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}