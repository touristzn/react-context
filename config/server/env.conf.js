/**
 * 配置不同环境的打包发布参数
 */

const NODE_ENV = process.env.NODE_ENV || 'dev';
const configs = {};

// common
const common = {
  env: NODE_ENV,
}

// dev
configs['development'] = Object.assign({}, common, {
  port: '3001'
})

// prod
configs['production'] = Object.assign({}, common, {
  port: '3002'
})

// module.exports
module.exports = configs[NODE_ENV]