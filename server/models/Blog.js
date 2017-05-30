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

var blogSchema = new mongoose.Schema({
  type: {type: String, default: 'blog'},
  time: Date,
  user: String,
  group: String,
  body: {
    title: String,
    content: String,
    visits: {type: Number, default: 0}
  },
  comments: [commentSchema],
  thumbsUp: [thumbsUpSchema]
});

// 评论
blogSchema.statics.pinglun = function (obj, callback) {
  this.model('Blog').findOne({_id: obj.id}, function (err, blog) {
    if (!blog) {
      return;
    }
    blog.comments.push(obj.body);
    blog.save(callback);
  })
};

// 删除评论
blogSchema.statics.dlPinglun = function (obj, callback) {
  this.model('Blog').update({_id: obj.id}, {$pull: {comments: {_id: obj.commentId}}}, callback);
};

// 点赞
blogSchema.statics.thumbsUp = function (obj, callback) {
  this.model('Blog').findOne({_id: obj.id}, function (err, blog) {
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
blogSchema.statics.cancelThumbsUp = function (obj, callback) {
  this.model('Blog').update({_id: obj.id}, {$pull: {thumbsUp: {user: obj.body.user}}}, callback);
};

var blogModel = db.model('Blog', blogSchema);
module.exports = blogModel;
