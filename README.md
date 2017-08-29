# pandazone

> 使用vue2.0+element-ui+node.js+mongodb构建全栈空间博客系统，仿qq空间，有说说，博客，相册，留言，好友等模块。

线上地址：https://auven.github.io/pandazone/

如果不了解node.js和mongoDB，可以阅读[nodejs+express+mongodb学习笔记](https://github.com/auven/blog/issues/20)简单入门一下。

## 运行

### 安装依赖

```bash
$ npm install

# 如果上面的命令安装很慢，可以使用以下命令
$ npm install --registry=https://registry.npm.taobao.org
```

### 开发环境

**注意：** 开发环境使用真实的数据，需安装MongoDB。

首先你必须开启MongoDB数据库，至于如何使用MongoDB，我在这里不多做解释，请自行百度。

``` bash
# 安装依赖
npm install

# 初始化citys表，用于注册页面的城市数据来源
npm run initCitys

# 启动服务器，运行在localhost:8080
npm run dev
```

开发环境vue路由使用history模式。

### 生产环境

生产环境下，使用mock数据，若要更换真实数据，请修改`config/prod.env.js`里的`BASE_API`。

```base
# 打包压缩代码
npm run build

# 预览网页
node server/prod.server.js
```

生产环境vue路由使用hash模式。

## 介绍

本项目是我的毕业设计，以前用php实现过这个网站，但是因为最近在学习vue，所以就使用了vue来做这个项目。

涉及的技术：vue2.0、express、node.js+mongodb，使用了element、PhotoSwipe、百度ueditor等插件。

## 目录结构

```
│  .babelrc
│  .editorconfig
│  .eslintignore
│  .eslintrc.js
│  .gitignore
│  .postcssrc.js
│  .travis.yml
│  index.html
│  package.json
│  README.md
│
├─build  // webpack配置文件
│      build.js
│      check-versions.js
│      dev-client.js
│      dev-server.js
│      initCitys.js
│      utils.js
│      vue-loader.conf.js
│      webpack.base.conf.js
│      webpack.dev.conf.js
│      webpack.prod.conf.js
│      webpack.test.conf.js
│
├─config  // webpack配置文件
│      dev.env.js
│      index.js
│      prod.env.js
│      test.env.js
│
├─dist  // build之后的目录
│
├─server  // express服务器相关代码
│  │  prod.server.js
│  │  settings.js
│  │
│  ├─models  // mongoose模块(与MongoDB进行数据交互)
│  │      Album.js
│  │      Blog.js
│  │      BlogGroup.js
│  │      db.js
│  │      dbs.js
│  │      Log.js
│  │      md5.js
│  │      Mood.js
│  │      User.js
│  │
│  ├─router  // 服务器路由配置
│  │      router.js
│  │
│  └─upload  // 图片上传目录
│      ├─album  // 相册
│      │
│      ├─avatar  // 头像
│      │
│      ├─moodImg  // 说说配图
│      │
│      └─temp  // 临时上传文件
├─src  // vue项目源文件
│  │  App.vue
│  │  main.js  // 入口文件
│  │
│  ├─common  // 公共
│  │  ├─fonts
│  │  │      pandazone.eot
│  │  │      pandazone.svg
│  │  │      pandazone.ttf
│  │  │      pandazone.woff
│  │  │
│  │  └─stylus
│  │          base.styl
│  │          icon.styl
│  │          index.styl
│  │          mixin.styl
│  │
│  ├─components  // 组件
│  │  ├─404
│  │  │      404.png
│  │  │      404.vue
│  │  │      404_msg.png
│  │  │      404_to_index.png
│  │  │      error_bg.jpg
│  │  │      error_cloud.png
│  │  │
│  │  ├─album
│  │  │      album.vue
│  │  │
│  │  ├─albumDetail
│  │  │      albumDetail.vue
│  │  │
│  │  ├─blog
│  │  │      blog.vue
│  │  │
│  │  ├─blogDetail
│  │  │      blogDetail.vue
│  │  │
│  │  ├─blogModify
│  │  │      blogModify.vue
│  │  │
│  │  ├─footer
│  │  │      footer.vue
│  │  │      WechatIMG2.jpeg
│  │  │
│  │  ├─friends
│  │  │      friends.vue
│  │  │
│  │  ├─header
│  │  │      header.vue
│  │  │
│  │  ├─home
│  │  │      home.vue
│  │  │
│  │  ├─index
│  │  │      index.vue
│  │  │
│  │  ├─login
│  │  │      login.vue
│  │  │
│  │  ├─message
│  │  │      message.vue
│  │  │
│  │  ├─mood
│  │  │      mood.vue
│  │  │
│  │  ├─newBlog
│  │  │      newBlog.vue
│  │  │
│  │  ├─newMood
│  │  │      newMood.vue
│  │  │
│  │  ├─profile
│  │  │      profile.vue
│  │  │
│  │  ├─register
│  │  │      register.vue
│  │  │
│  │  ├─status
│  │  │      status.vue
│  │  │
│  │  ├─uploadImg
│  │  │      uploadImg.vue
│  │  │
│  │  ├─userIndex
│  │  │      userIndex.vue
│  │  │
│  │  └─vueUeditor
│  │          vueUeditor.vue
│  │
│  └─router  // vue-router
│          index.js
│
└─static  // 静态资源文件
    │  .gitkeep
    │  city.json
    │
    ├─css
    │      normalize.css
    │
    ├─images
    │      72019_bg.jpg
    │      72019_top.png
    │      moren.jpg
    │
    ├─js
    │  └─PhotoSwipe
    │
    └─ueditor1_4_3_3
```

## 截图

### 登录

![image](https://raw.githubusercontent.com/auven/pandazone/master/screenshot/1.png)

### 注册

![image](https://raw.githubusercontent.com/auven/pandazone/master/screenshot/2.png)

### 个人主页

![image](https://raw.githubusercontent.com/auven/pandazone/master/screenshot/3.png)
![image](https://raw.githubusercontent.com/auven/pandazone/master/screenshot/4.png)

### 说说

![image](https://raw.githubusercontent.com/auven/pandazone/master/screenshot/5.png)
![image](https://raw.githubusercontent.com/auven/pandazone/master/screenshot/6.png)
![image](https://raw.githubusercontent.com/auven/pandazone/master/screenshot/7.PNG)

### 博客

![image](https://raw.githubusercontent.com/auven/pandazone/master/screenshot/8.png)
![image](https://raw.githubusercontent.com/auven/pandazone/master/screenshot/9.PNG)
![image](https://raw.githubusercontent.com/auven/pandazone/master/screenshot/10.PNG)

### 相册

![image](https://raw.githubusercontent.com/auven/pandazone/master/screenshot/11.png)
![image](https://raw.githubusercontent.com/auven/pandazone/master/screenshot/12.png)
![image](https://raw.githubusercontent.com/auven/pandazone/master/screenshot/13.png)

### 留言

![image](https://raw.githubusercontent.com/auven/pandazone/master/screenshot/14.png)

### 好友

![image](https://raw.githubusercontent.com/auven/pandazone/master/screenshot/15.png)

### 个人档

![image](https://raw.githubusercontent.com/auven/pandazone/master/screenshot/16.png)


