const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const session = require('koa-session');
const db = require('./src/db');
const router = require('./src/routers/router');
const environment = require('./config/environment')[process.env.NODE_ENV];

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

app.use(
  koaBody({
    multipart: true,
    formidable: {
      keepExtensions: true,
      onFileBegin(name, file) {
        file.path = __dirname + '/public/images/' + file.name;
      },
      uploadDir: __dirname + '/public/images'
    }
  })
);

app.use(router.routes()).use(router.allowedMethods());

app.listen(environment.port, () => {
  console.log(`listening to port ${environment.port}...`);
});
