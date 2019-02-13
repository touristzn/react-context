const path = require('path');

const koa = require('koa');
const onerror = require('koa-onerror');
const locale = require('koa-locale'); //  检测语言环境
const i18n = require('koa-i18n-s');
const bodyParser = require('koa-body');

const config = require('../config/server/env.conf');

const NODE_ENV = process.env.NODE_ENV;

// new app
const app = new koa();

onerror(app);

// the locale key name defaults to `locale`
locale(app, 'language');

if (NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware')
  const webpackConfig = require('../config/webpack.dev.config');
  const compiler = webpack(webpackConfig);

  Object.keys(webpackConfig.entry).forEach(function (key) {
    let val = webpackConfig.entry[key];
    val.unshift('webpack-hot-middleware/client')
    val.unshift('react-hot-loader/patch')
  });

  app.use(devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
    noInfo: false
  }))

  app.use(hotMiddleware(compiler, {
    log: console.log
  }));
}

app.use(bodyParser({
  multipart: true,
  jsonLimit: '1mb',
  formLimit: '500kb'
}));

app.use(i18n(app, {
  directory: path.join(__dirname, './i18n'),
  extension: '.json',
  locales: ['zh-CN', 'en'],
  defualtLocale: 'zh-CN',
  modes: ['url', 'header'],
  mappings: {
    'zh': 'zh-CN',
    'en-US': 'en'
  },
  rewrite: true
}));

app.use(async (ctx, next) => {
  const start = new Date();
  const ms = new Date() - start;
  // await next();
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 开启监听服务
const server = app.listen(config.port);
console.log(`=====server listen on: ${config.port}=====`);