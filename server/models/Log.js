var mongoose = require('mongoose');
var db = require("./dbs.js");

var logSchema = new mongoose.Schema({
  type      :   {type : String},
  time      :   {type : Date},
  user      :   {type : String},
  body      :   {type : String}
});

// obj里有user数组，type
logSchema.statics.getStatus = function (obj, callback) {
  if (obj.type === 'all') {
    this.model('Log')
      .find({user: {'$in': obj.user}})
      .skip(obj.page*(-(-obj.pageSize)))
      .limit((-(-obj.pageSize)))
      .sort('-time')
      .select('type body')
      .exec(callback);
  } else {
    console.log('查询' + obj.type);
    this.model('Log')
      .find({user: {'$in': obj.user}, type: obj.type})
      .skip(obj.page*(-(-obj.pageSize)))
      .limit((-(-obj.pageSize)))
      .sort('-time')
      .select('type body')
      .exec(callback);
  }
};

// 获取总条数
logSchema.statics.getTotal = function (obj, callback) {
  if (obj.type === 'all') {
    this.model('Log')
      .find({user: {'$in': obj.user}})
      .exec(callback);
  } else {
    this.model('Log')
      .find({user: {'$in': obj.user}, type: obj.type})
      .exec(callback);
  }
};

var logModel = db.model('Log', logSchema);
module.exports = logModel;
