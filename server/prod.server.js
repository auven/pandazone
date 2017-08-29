var express = require('express');
var session = require('express-session');
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

//静态网页文件放置的位置
app.use(express.static('./dist'));

app.listen('5200', function (port) {
  console.log('> Listening at http://localhost:5200 \n');
});
