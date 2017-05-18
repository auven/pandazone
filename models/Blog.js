/**
 * Created by auven on 2017/5/17.
 */
var mongoose = require('mongoose');
var db = require("./dbs.js");

var commentSchema = new mongoose.Schema({
  user: String,
  name: String,
  avatar: String,
  time: Date,
  content: String
});

var thumbsUpSchema = new mongoose.Schema({
  user: String,
  name: String
});

var blogSchema = new mongoose.Schema({
  type: {type: String, default: 'blog'},
  time: Date,
  user: String,
  name: String,
  avatar: String,
  group: String,
  body: {
    title: String,
    content: String,
    visits: {type: Number, default: 0}
  },
  comments: [commentSchema],
  thumbsUp: [thumbsUpSchema]
});

var blogModel = db.model('Blog', blogSchema);
module.exports = blogModel;
