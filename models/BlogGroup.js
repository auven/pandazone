/**
 * Created by auven on 2017/5/17.
 */
var mongoose = require('mongoose');
var db = require("./dbs.js");

var bgSchema = new mongoose.Schema({
  user: String,
  blogGroup: [{
    groupName: String,
    blogs: [String]
  }]
});

// 添加到分组
bgSchema.statics.addToGroup = function (obj, callback) {
  var model = this.model('BlogGroup');
  model.findOne({user: obj.user}, function (err, user) {
    if (!user) {
      model.create({
        user: obj.user,
        blogGroup: [{
          groupName: obj.groupName,
          blogs: [obj.blogId]
        }]
      }, callback);
    } else {
      var flag = false;
      var index;
      for (var i = 0; i < user.blogGroup.length; i++) {
        if (obj.groupName === user.blogGroup[i].groupName) {
          flag = true;
          index = i;
          break;
        }
      }
      if (flag) {
        user.blogGroup[index].blogs.push(obj.blogId);
        user.save(callback);
      } else {
        user.blogGroup.push({
          groupName: obj.groupName,
          blogs: [obj.blogId]
        });
        user.save(callback);
      }
    }
  })
};

var bgModel = db.model('BlogGroup', bgSchema);
module.exports = bgModel;
