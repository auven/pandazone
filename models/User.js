/**
 * Created by auven on 2017/4/20.
 */
var mongoose = require('mongoose');
var db = require("./dbs.js");

var messageSchema = new mongoose.Schema({
  author    :   {type : String},
  time      :   {type : Number},
  content   :   {type : String}
});

var friendSchema = new mongoose.Schema({
  user      :   {type : String},
  eachFocus :   {type : Boolean, default: false}
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



var userModel = db.model('User', userSchema);
module.exports = userModel;
