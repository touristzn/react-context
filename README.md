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

##备注
需要国际化语言的，只需引入components中的withLocale组件，用它包裹住你写的组件，例：export default withLocale(ChinaAppDownload)
在自己的组件中引入：
import { FormattedMessage } from 'react-intl';
<FormattedMessage id="ChinaAppDownload.download"/>

获取全局的语言变量：window.language

