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
//上传的文件放置的位置
app.use("/upload",express.static("./server/upload"));
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
app.get('/test',router.getFriends);
app.post('/newMood',router.newMood);
app.post('/dl',router.dl);
app.get('/getStatus',router.getStatus);
app.post('/addComment',router.addComment);
app.post('/dlComment',router.dlComment);
app.post('/thumbsUp',router.thumbsUp);
app.post('/newBlog',router.newBlog);
app.get('/getBlogGroup',router.getBlogGroup);
app.get('/getUserProfile',router.getUserProfile);
app.post('/updateProfile',router.updateProfile);
app.post('/newAlbum',router.newAlbum);
app.get('/getAlbum',router.getAlbum);
app.get('/getAlbumById',router.getAlbumById);
app.post('/newMsg',router.newMsg);
app.get('/getMsg', router.getMsg);
app.post('/dlMsg', router.dlMsg);
app.get('/getFriends',router.getFriends);
app.post('/addFriend', router.addFriend);
app.post('/dlFriend', router.dlFriend);
app.get('/getBlogs', router.getBlogs);
app.get('/getBlogDetail', router.getBlogDetail);
app.post('/modifyBlog', router.modifyBlog);

//静态网页文件放置的位置
app.use(express.static('./dist'));

app.listen('5200');
