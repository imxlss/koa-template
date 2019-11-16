# koa-template

一个基于 koa2 的后端 Api 服务模版

## 启动

> yarn install

> yarn start

## 文件目录结构

```
- config  // 配置文件
- src
  - controllers // 控制层  负责业务逻辑
  - models  // 数据层  定义数据结构
  - routers  // 路由层  转发请求
  - db.js  // 连接数据库
  - app.js  // 入口文件
```