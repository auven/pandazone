/*
 * mongoose相关配置
 */

//引包
var mongoose = require('mongoose');
var settings = require("../settings.js");
mongoose.Promise = global.Promise;
//创建数据库连接
var db      = mongoose.createConnection(settings.dburl);
//监听open事件
db.once('open', function (callback) {
  console.log("数据库成功连接");
});
//向外暴露这个db对象
module.exports = db;
