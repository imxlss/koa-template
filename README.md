# koa-template

一个基于 koa2 的后端 Api 服务模版

## 启动

获取项目

> git clone https://github.com/imxlss/koa-template.git

安装依赖

> yarn install

启动项目

> yarn start

部署项目

> yarn deploy

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

## 上传到阿里云 oss

使用阿里云 OSS Node.js SDK

- 创建 OSS 对象

```js
let OSS = require('ali-oss');

let client = new OSS({
  region: '<oss region>',
  accessKeyId: '<Your accessKeyId>',
  accessKeySecret: '<Your accessKeySecret>',
  bucket: '<Your bucket name>'
});
```

- 通过 `put` 接口上传本地文件：

```js
// put(fileName, 本地文件)
const result = await client.put('object-name', 'local-file');
```

- 通过 `get`` 接口下载文件

```js
const result = await client.get('object-name', 'local-file');
```
