const md5 = require('md5');
const UserModel = require('../models/user.model');

class UserController {
  // 注册
  static async register(ctx) {
    const { username, password, apassword } = ctx.request.body;

    if (!username || !password) {
      return (ctx.body = { status: 'fail', msg: '请输入用户名和密码！' });
    }

    if (password !== apassword) {
      return (ctx.body = { status: 'fail', msg: '两次输入的密码不一致！' });
    }

    const isExist = await UserModel.findOne({ username });

    if (isExist) {
      return (ctx.body = { status: 'fail', msg: '账号已存在' });
    }

    const result = await UserModel.create({
      username,
      password: md5(password)
    });

    if (!result) {
      return (ctx.body = { status: 'fail', msg: '注册失败' });
    }

    return (ctx.body = { status: 'success', msg: '注册成功' });
  }

  // 登录
  static async signin(ctx) {
    const { username, password } = ctx.request.body;

    if (!username || !password) {
      return (ctx.body = { status: 'fail', msg: '请输入账号和密码' });
    }

    const data = await UserModel.findOne(
      { username, password: md5(password) },
      { password: 0 }
    );

    if (!data) return (ctx.body = { status: 'fail', msg: '用户名或密码错误' });
    ctx.session.user = data;
    const id = data._id;
    const max_age = 1000 * 60 * 10;

    ctx.cookies.set('userid', id, { maxAge: max_age, httpOnly: false });
    ctx.cookies.set('username', username, { maxAge: max_age, httpOnly: false });

    ctx.body = { status: 'success', msg: '登录成功', data };
  }

  // 登出
  static async signout(ctx) {
    console.log(ctx.cookies.get('userid'));

    ctx.session.user = null;
    ctx.cookies.set('userid', null, { maxAge: 0 });
    ctx.cookies.set('username', null, { maxAge: 0 });
    return (ctx.body = { status: 'success', msg: '退出成功' });
  }
}

module.exports = UserController;
