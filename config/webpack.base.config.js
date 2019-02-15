const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const es3ifyPlugin = require('es3ify-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path')
const glob = require('glob')

const isProduction = process.env.NODE_ENV === 'production'

let htmlPlugins = [];

module.exports = {
  entry: getEntry(),

  output: {
    path: path.resolve(__dirname,'../dist'),
    publicPath: '/' //如CSS中图片或字体图标引用时使用的是相对路径，则需要加上此属性，否则输出的路径前面会加一个css的目录
  },

  module: {
    rules: [
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
              limit: 1000
            }
          }
        ]
      },

      {
        test: /\.less$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {//postcss需要放在less前
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

  resolve: {
    extensions: ['.js', '.jsx', '.less']
  },

  plugins: [
    new es3ifyPlugin(),

    new webpack.optimize.SplitChunksPlugin({
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        //打包重复出现的代码
        vendor: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
          name: 'vendor'
        },
        //打包第三方类库
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: Infinity
        }
      }
    }),

    new webpack.optimize.RuntimeChunkPlugin({
        name: "manifest"
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[contentHash:5].css',
    }),
  ]
    .concat(htmlPlugins)
}

//获取entry文件夹下面的所有页面
function getEntry() {
  let entry = {};
  //读取页面目录，并进行路径裁剪
  glob.sync('./app/entry/*.jsx')
    .forEach(ele => {
      let name = ele.split('/').pop().replace(/\.jsx?/, '');
      entry[name] = [ele];
      //生成页面
      htmlPlugins.push(
        new HtmlWebpackPlugin({
          filename: name + '.html',
          template: './app/template/index.html',
          title: 'webpack+react',
          description: 'webpack+react',
          hash: true,
          inject: true,
          chunksSortMode: 'dependency'
        })
      )
    });
  return entry;
}

/**
 * 获取绝对路径
 */
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}