# Talent Starter

## 快速开始
- 下载本项目，并进入项目文件夹
- 执行`npm install`，安装依赖包
- 执行`npm start`，运行项目
- 访问 http://localhost:5000
  - 如果需要修改端口，请修改webpack.config.js中的port属性

## LeanCloud

如果要启用LeanCloud，作为后台存储，请执行以下操作：
- 1) 进入项目目录；
- 2) 拷贝环境变更 cp .env.sample .env
- 3) 在.env文件中，填写对应的Key


## CHANGELOG

### 0.4.2
- 引入immutable
- 增加todos示例
  - LeanCloud作为云存储
  - 分页功能
  - 状态过滤器


### 0.3.0
- 增加falcor的get和set示例

### 0.2.0
- 增加5个redux的示例代码

### 0.1.2
- 增加bootstrap样式文件
- 增加server-static

### 0.1.1
- 增加react router的使用示例，src/routers.js

### 0.1.0
- 支持hot module reload
- 增加Debug功能，页面、命令行、开发者工具控制台全方位输出错误信息
- 新增文件: .babelrc, .editrconfig
