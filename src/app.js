const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const db = require('./db');
const router = require('./routers/router');
const environment = require('../config/environment')[process.env.NODE_ENV];

/* const axios = require('axios');
axios.get('xxx_url').then(res => {
  console.log(res);
}); */

app.keys = ['koa-template:secret'];
const CONFIG = {
  key: 'koa-template',
  maxAge: 1000 * 60 * 5, // 有效期
  overwrite: true,
  signed: true
};

/* 中间件 */
app.use(session(CONFIG, app));

// 使用用koa-bodyparser中间件 可以直接在ctx.request.body 中获取到JSON格式的POST数据。
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(environment.port, () => {
  console.log(`listening to port ${environment.port}...`);
});
