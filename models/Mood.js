/**
 * Created by auven on 2017/5/4.
 */
var mongoose = require('mongoose');
var db = require("./dbs.js");

var commentSchema = new mongoose.Schema({
  user: String,
  name: String,
  avatar: String,
  time: Number,
  content: String
});

var thumbsUpSchema = new mongoose.Schema({
  user: String,
  name: String
});

var moodSchema = new mongoose.Schema({
  time      :   {type : Number},
  user      :   {type : String},
  name      :   {type : String},
  avatar    :   {type : String},
  body      :   { text: String, img: [String] },
  comments   :   [commentSchema],
  thumbsUp  :   [thumbsUpSchema]
});

// 评论
moodSchema.statics.pinglun = function (obj, callback) {
  this.model('Mood').findOne({_id: obj.moodId}, function (err, mood) {
    if (!mood) {
      return;
    }
    mood.comments.push(obj.body);
    mood.save(callback);
  })
};

// 删除评论
moodSchema.statics.dlPinglun = function (obj, callback) {
  this.model('Mood').update({_id: obj.moodId}, {$pull: {comments: {_id: obj.plId}}}, callback);
};

var moodModel = db.model('Mood', moodSchema);
module.exports = moodModel;
