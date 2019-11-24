const OSS = require('ali-oss');
const fs = require('fs');
const config = require('../../alioss.config');

class UploadController {
  static async alioss(ctx, next) {
    const { file } = ctx.request.files;

    const isExist = await fs.existsSync(file.path);
    if (!isExist) return (ctx.body = { msg: '文件上传失败' });

    const client = new OSS(config.oss);
    const result = await client.put(`${config.folder}${file.name}`, file.path);
    if (!result || !result.url)
      return (ctx.body = { msg: '文件上传云端失败!' });

    // 删除文件
    fs.unlinkSync(file.path);

    const { url } = result;
    ctx.upload = { url };

    await next();
  }
}

module.exports = UploadController;
