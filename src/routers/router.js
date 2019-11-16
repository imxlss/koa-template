const Router = require('koa-router');
const router = new Router();
const UserController = require('../controllers/user');

// cors 解决跨域
// ctx.set('Access-Control-Allow-Origin', 'http://www.xxxx.com');
router.all('/api/*', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:8000');
  ctx.set('Access-Control-Allow-Credentials', 'true');
  await next();
});

router
  .post('/api/register', UserController.register)
  .get('/api/signout', UserController.signout);
// .<http method>(<url>, <controller.method>)

module.exports = router;
