/**
 * Created by auven on 2017/5/4.
 */
var mongoose = require('mongoose');
var db = require("./dbs.js");

var logSchema = new mongoose.Schema({
  type      :   {type : String},
  time      :   {type : Number},
  user      :   {type : String},
  name      :   {type : String},
  avatar    :   {type : String},
  body      :   {type : String}
});

// obj里有user数组，type
logSchema.statics.getStatus = function (obj, callback) {
  if (obj.type === 'all') {
    this.model('Log')
      .find({user: {'$in': obj.user}})
      .sort('-time')
      .select('type body')
      .exec(callback);
  } else {
    this.model('Log')
      .find({user: {'$in': obj.user}, type: obj.type})
      .sort('-time')
      .select('type body')
      .exec(callback);
  }
};

var logModel = db.model('Log', logSchema);
module.exports = logModel;
