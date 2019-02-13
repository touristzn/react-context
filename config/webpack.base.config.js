const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const es3ifyPlugin = require('es3ify-webpack-plugin')

const path = require('path')
const glob = require('glob')

const isProduction = process.env.NODE_ENV === 'production'

let htmlPlugins = [];

module.exports = {
  entry: getEntry(),

  output: {
    path: resolve('dist'),
    publicPath: '/' //如CSS中图片或字体图标引用时使用的是相对路径，则需要加上此属性，否则输出的路径前面会加一个css的目录
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              "presets": [
                "react",
                [
                  "env",
                  {
                    "targets": {
                      "browsers": [
                        'last 2 version',
                        'ie >= 8'
                      ]
                    }
                  }
                ], "stage-2"
              ],
              "plugins": isProduction ? [] : [
                ["react-hot-loader/babel"],
                ["transform-runtime"]
              ]
            }
          }
        ],
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

    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      axios: 'axios'
    }),

    //提取第三方库
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return (
          module.resource &&
          /\.(js|jsx|ttf|woff)$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),

    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),

    //提取公共代码和业务代码
    new webpack.optimize.CommonsChunkPlugin({
      name: ['common'],
      async: 'vendor-async',
      children: true,
      minChunks: 3
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