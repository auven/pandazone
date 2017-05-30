var mongoose = require('mongoose');
var db = require("./dbs.js");

var commentSchema = new mongoose.Schema({
  user: String,
  time: Date,
  content: String
});

var thumbsUpSchema = new mongoose.Schema({
  user: String
});

var albumSchema = new mongoose.Schema({
  type: {type: String, default: 'album'},
  time: Date,
  user: String,
  body: {
    name: String,
    cover: String,
    desc: String,
    photos: [String],
    visits: {type: Number, default: 0}
  },
  comments: [commentSchema],
  thumbsUp: [thumbsUpSchema]
});

// 评论
albumSchema.statics.pinglun = function (obj, callback) {
  this.model('Album').findOne({_id: obj.id}, function (err, blog) {
    if (!blog) {
      return;
    }
    blog.comments.push(obj.body);
    blog.save(callback);
  })
};

// 删除评论
albumSchema.statics.dlPinglun = function (obj, callback) {
  this.model('Album').update({_id: obj.id}, {$pull: {comments: {_id: obj.commentId}}}, callback);
};

// 点赞
albumSchema.statics.thumbsUp = function (obj, callback) {
  this.model('Album').findOne({_id: obj.id}, function (err, blog) {
    if (!blog) {
      return;
    }
    var flag = true;
    for (var i = 0; i < blog.thumbsUp.length; i++) {
      if (blog.thumbsUp[i].user === obj.body.user) {
        flag = false;
        break;
      }
    }
    if (flag) {
      blog.thumbsUp.push(obj.body);
    }
    blog.save(callback);
  })
};

// 取消点赞
albumSchema.statics.cancelThumbsUp = function (obj, callback) {
  this.model('Album').update({_id: obj.id}, {$pull: {thumbsUp: {user: obj.body.user}}}, callback);
};

var albumModel = db.model('Album', albumSchema);
module.exports = albumModel;
