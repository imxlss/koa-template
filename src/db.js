/**
 * @description 连接数据库
 */

const mongoose = require('mongoose');
const environment = require('../config/environment')[process.env.NODE_ENV];

mongoose
  .connect(environment.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`MongoDB connection succeeded!`))
  .catch(err => console.log(`MongoDB Connection failed: ${err.message})`));
