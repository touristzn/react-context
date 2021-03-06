## 命令行

- 安装依赖：`npm install`
- 本地开发：`npm run dev`
- 发布生产：`npm run prod`

## 访问链接

- `http://localhost:8000`


## 目录

```
---
  |---- dist: 构建脚本
  |---- config: 配置文件
  |
  | |
  | |----components: 基础组件
  | |----containers: 页面
  | |----entry: 入口js
  | |----static: 静态资源
  | |----template: 入口html，与entry一一对应
  | |
  |
  |---- server: node server 代码
---

## eslint
先全局安装eslint和eslint-import-resolver-webpack
再安装相关依赖
npm i babel-eslint eslint eslint-loader eslint-config-airbnb eslint-import-resolver-webpack eslint-config-prettier eslint-plugin-jsx-a11y eslint-plugin-import eslint-plugin-react eslint-plugin-react-intl eslint-plugin-jest -D

## 国际化语言
引入components中的withLocale组件，用它包裹住你写的组件
例：export default withLocale(ChinaAppDownload)

在自己的组件中引入：
import { FormattedMessage } from 'react-intl';
<FormattedMessage id="ChinaAppDownload.download"/>

获取全局的语言变量：window.language

## react-ionicons图标库
项目中已安装
https://zamarrowski.github.io/react-ionicons/

## jsx中图片的引用
<img src={require('相对路径')} alt=""/>

## oss部署
npm run prod
npm run deploy-oss

