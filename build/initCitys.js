/**
 * Created by auven on 2017/4/20.
 */

var db = require('../models/db.js');
var fs = require("fs");
var path = require('path'); // 引入node.js的API，获取当前目录的绝对路径

//查询数据库中是不是有这个人
db.find("citys", {}, function (err, result) {
  if (err) {
    console.log('服务器错误');
    return;
  }
  if (result.length !== 0) {
    console.log('数据已存在，初始化城市完成');
    return;
  }

  fs.readFile(path.resolve("static/city.json"), function (err, data) {
    if (err) {
      throw err;
    }
    db.insertOne("citys", {
      "citys": JSON.parse(data) // 将json数据字符串化
    }, function (err, result) {
      if (err) {
        console.log('服务器错误');
        return;
      }

      console.log('初始化城市完成');
    })
  });
});
