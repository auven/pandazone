var mongoose = require('mongoose');
var db = require("./dbs.js");

var messageSchema = new mongoose.Schema({
  author    :   {type : String},
  time      :   {type : Date},
  content   :   {type : String}
});

var friendSchema = new mongoose.Schema({
  user      :   {type : String}
});

var userSchema = new mongoose.Schema({
  user     :  {type : String},
  name     :  {type : String},
  pass     :  {type : String},
  email    :  {type : String},
  avatar   :  {type : String},
  sex      :  {type : String},
  born     :  {type : String},
  city     :  {type : String},
  hobby    :  {type : String},
  label    :  {type : String},
  sign     :  {type : String},
  visits   :  {type : Number},
  messages :  [messageSchema],
  friends  :  [friendSchema]
});

// 留言
userSchema.statics.message = function (obj, callback) {
  this.model('User').findOne({user: obj.user}, function (err, user) {
    if (!user) {
      return;
    }
    user.messages.push(obj.body);
    user.save(callback);
  })
};

// 删除留言
userSchema.statics.dlMsg = function (obj, callback) {
  this.model('User').update({user: obj.user}, {$pull: {messages: {_id: obj.messageId}}}, callback);
};

// 添加好友
userSchema.statics.addFriend = function (obj, callback) {
  this.model('User').findOne({user: obj.user}, function (err, user) {
    if (!user) {
      return;
    }
    user.friends.push(obj.body);
    user.save(callback);
  })
};

// 删除好友
userSchema.statics.dlFriend = function (obj, callback) {
  this.model('User').update({user: obj.user}, {$pull: {friends: {user: obj.friend}}}, callback);
};

var userModel = db.model('User', userSchema);
module.exports = userModel;
