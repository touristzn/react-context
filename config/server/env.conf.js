/**
 * 配置不同环境的打包发布参数
 */

const APP_ENV = process.env.APP_ENV || 'dev';
const configs = {};

// common
const common = {
  env: APP_ENV,
}

// dev
configs['dev'] = Object.assign({}, common, {
  port: '3001'
})

// prod
configs['prod'] = Object.assign({}, common, {
  port: '3002'
})

// module.exports
module.exports = configs[APP_ENV]