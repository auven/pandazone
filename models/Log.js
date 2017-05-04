/**
 * Created by auven on 2017/5/4.
 */
var mongoose = require('mongoose');
var db = require("./dbs.js");

var logSchema = new mongoose.Schema({
  type      :   {type : String},
  time      :   {type : String},
  user      :   {type : String},
  name      :   {type : String},
  body      :   {type : String}
});

var logModel = db.model('Log', logSchema);
module.exports = logModel;
