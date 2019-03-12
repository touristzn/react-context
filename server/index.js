const path = require('path');

const koa = require('koa');
const onerror = require('koa-onerror');
const bodyParser = require('koa-body');

const config = require('../config/server/env.conf');

const NODE_ENV = process.env.NODE_ENV;

// new app
const app = new koa();

onerror(app);

if (NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware')
  const webpackConfig = require('../build/webpack.dev.config');
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

app.use(async (ctx, next) => {
  const start = new Date();
  const ms = new Date() - start;
  // await next();
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 开启监听服务
const server = app.listen(config.port);
console.log(`Please visit: http://127.0.0.1:${config.port}`);