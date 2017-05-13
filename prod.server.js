/**
 * Created by auven on 2017/5/14.
 */
var express = require('express');
var session = require('express-session');
var router = require('./router/router.js');
// 解决history模式下
// 开发环境下跑起来都没问然后npm run build后，打开监听port没问题，但是刷新页面后就挂掉了 的问题
// 可以参考https://router.vuejs.org/zh-cn/essentials/history-mode.html
var history = require('connect-history-api-fallback');

var app = express();

app.use(history());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

//设置路由
//注册业务
app.use("/upload",express.static("./upload"));
app.post('/doregister',router.doRegist);
app.get('/getCitys',router.getCitys);
app.get('/getCaptcha',router.getCaptcha);
app.get('/checkCaptcha',router.checkCaptcha);
app.get('/findUser/:user',router.findUser);
app.post('/uploadTemp',router.uploadTemp);
app.post('/dologin',router.dologin);
app.get('/checkEmail/:user/:email',router.checkEmail);
app.get('/checkLogin',router.checkLogin);
app.post('/exit',router.exit);
app.get('/setUser/:user',router.setUser);
app.get('/test',router.getStatus);
app.post('/newMood',router.newMood);
app.get('/getStatus',router.getStatus);


app.use(express.static('./dist'));

app.listen('5200');
