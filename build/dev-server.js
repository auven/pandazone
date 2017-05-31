require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

//引入服务器路由配置
var router = require('../server/router/router.js');
var session = require('express-session');


var app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

//设置路由
//注册业务
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
app.get('/chkFriend', router.chkFriend);

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
