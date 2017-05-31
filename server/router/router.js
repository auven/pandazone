//引入配置和相关文件、包
var formidable = require("formidable");
var db = require('../models/db.js');
var md5 = require('../models/md5.js');
var path = require("path");
var fs = require("fs");

// 验证码第三方包
var svgCaptcha = require('svg-captcha');

// 数据库模块
var User = require('../models/User.js');
var Log = require('../models/Log.js');
var Mood = require('../models/Mood.js');
var Blog = require('../models/Blog.js');
var BlogGroup = require('../models/BlogGroup.js');
var Album = require('../models/Album.js');

//注册业务
exports.doRegist = function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {

    // 先判断upload/avatar文件夹是否存在，不存在就创建
    var avatarDir = fs.existsSync("./server/upload/avatar");

    if (!avatarDir) {
      fs.mkdirSync("./server/upload/avatar");
    }

    //得到表单之后做的事情
    var user = fields.user;
    var name = fields.name;
    var pass = fields.pass;
    var email = fields.email;
    var avatar = fields.avatar ? '/upload/avatar/' + user + '.jpg' : "/static/images/moren.jpg";
    var sex = fields.sex;
    var born = fields.born;
    var city = fields.city;
    var hobby = fields.hobby;
    var label = JSON.stringify(fields.label);
    var sign = fields.sign;


    //查询数据库中是不是有这个人
    User.find({"user": user}, function (err, result) {
      if (err) {
        res.send("-3"); //服务器错误
        return;
      }
      if (result.length !== 0) {
        res.send("-1"); //被占用
        return;
      }
      //设置md5加密
      pass = md5(md5(pass) + "考拉");
      //现在可以证明，用户名没有被占用
      User.create({
        user: user,
        name: name,
        pass: pass,
        email: email,
        avatar: avatar,
        sex: sex,
        born: born,
        city: city,
        hobby: hobby,
        label: label,
        sign: sign,
        visits: 0
      }, function (err, result) {
        if (err) {
          res.send("-3"); //服务器错误
          return;
        }
        if (fields.avatar) {
          var oldpath = path.normalize(__dirname + "/.." + fields.avatar);
          var newName = user + ".jpg";
          var newpath = path.normalize(__dirname + "/../upload/avatar") + "/" + newName;
          fs.rename(oldpath, newpath);
        }
        console.log('注册成功');
        // 设置session
        req.session.login = {
          user: user,
          name: result.name,
          avatar: result.avatar
        };
        res.json({result: "1", info: {user: user, name: name, avatar: avatar}}); // 注册成功
      })
    })
  });
};

// 获取城市列表
exports.getCitys = function (req, res, next) {
  db.find("citys", {}, function (err, result) {
    if (err) {
      res.send("-1"); //服务器错误
      return;
    }
    res.json(result[0].citys);
  });
};

// 生成验证码
exports.getCaptcha = function (req, res, next) {
  var captcha = svgCaptcha.create();
  req.session.captcha = captcha.text;

  res.set('Content-Type', 'image/svg+xml');
  res.status(200).send(captcha.data);
};

// 校验验证码
exports.checkCaptcha = function (req, res, next) {
  var captcha = req.session.captcha.toLocaleLowerCase();
  res.status(200).json({result: captcha});
};

// 查找数据库中是否有这个用户
exports.findUser = function (req, res, next) {
  var user = req.params["user"];
  //查询数据库中是不是有这个人
  User.find({"user": user}, function (err, result) {
    if (err) {
      res.send("-3"); //服务器错误
      return;
    }
    if (result.length !== 0) {
      res.send("-1"); //被占用
    } else {
      res.send("1"); // 没有被占用，可以注册
    }
  })
};

// 上传图片
exports.uploadTemp = function (req, res, next) {
  // 先判断upload/temp文件夹是否存在，不存在就创建
  var uploadDir = fs.existsSync("./server/upload");
  var tempDir = fs.existsSync("./server/upload/temp");

  if (!uploadDir) {
    console.log('创建upload文件夹');
    fs.mkdirSync("./server/upload");
  }

  if (!tempDir) {
    console.log('创建upload/temp文件夹');
    fs.mkdirSync("./server/upload/temp");
  }

  var form = new formidable.IncomingForm();
  form.uploadDir = path.normalize(__dirname + "/../upload/temp");
  form.parse(req, function (err, fields, files) {
    var oldpath = files.avatar.path;
    // 将路径字符串转换成对象
    var pathObj = path.parse(oldpath);
    var oldName = pathObj.name;
    var newName = oldName + ".jpg";
    var newpath = path.normalize(__dirname + "/../upload/temp") + "/" + newName;
    fs.rename(oldpath, newpath, function (err) {
      if (err) {
        res.send("失败");
        return;
      }
      res.send({'id': 101, 'path': '/upload/temp/' + newName});
    });
  });
};

// 登录
exports.dologin = function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    //得到表单之后做的事情
    var user = fields.user;
    var pass = fields.pass;

    //设置md5加密
    pass = md5(md5(pass) + "考拉");
    User.find({"user": user, "pass": pass}, 'name avatar visits', function (err, result) {
      if (err) {
        res.json({result: "-3"}); // 服务器错误
        return;
      }
      if (result.length !== 0) {
        // 设置session
        req.session.login = {
          user: user,
          name: result[0].name,
          avatar: result[0].avatar
        };
        res.json({
          result: "1",
          login: {user: user, name: result[0].name, avatar: result[0].avatar, visits: result[0].visits}
        }); // 登录成功
      } else {
        res.json({result: "-1"}); // 登录失败，密码错误
      }
    })
  });
};

// 找回密码之验证邮箱
exports.checkEmail = function (req, res, next) {
  var user = req.params["user"];
  var email = req.params["email"];
  //查询数据库中是不是有这个人
  User.find({"user": user, "email": email}, function (err, result) {
    if (err) {
      res.send("-3"); //服务器错误
      return;
    }
    if (result.length !== 0) {
      res.send("1"); // 验证成功
    } else {
      res.send("-1"); // 验证失败，邮箱错误
    }
  })
};

// 检查登录状态
exports.checkLogin = function (req, res, next) {
  var user = req.query.user;

  var login = req.session.login || '';
  if (login !== '') {

    User.find({"user": login.user}, 'name avatar visits', function (err, result) {
      if (err) {
        res.json({result: "-3"}); // 服务器错误
        return;
      }
      var isLoginUser = true;
      // 如果user存在，且不为登录的用户
      if (user !== '' && user !== login.user) {
        User.find({"user": user}, 'name avatar visits', function (err, result1) {
          if (result1.length === 0) {
            res.json({result: "-2"}); // 没有这个用户
          } else {
            isLoginUser = false;

            res.json({
              result: "1",
              login: {user: login.user, name: result[0].name, avatar: result[0].avatar, visits: result[0].visits},
              user: {user: user, name: result1[0].name, avatar: result1[0].avatar, visits: result1[0].visits},
              isLoginUser: isLoginUser
            });
          }
        });
      } else { // user不存在或等于登录用户
        res.json({
          result: "1",
          login: {user: login.user, name: result[0].name, avatar: result[0].avatar, visits: result[0].visits},
          isLoginUser: isLoginUser
        });
      }
    });
  } else {
    res.json({result: '-1'});
  }
};

// 退出
exports.exit = function (req, res, next) {
  req.session.login = '';
  req.session.user = '';
  res.send('1');
};

// 设置显示的用户
exports.setUser = function (req, res, next) {
  var user = req.params["user"];
  //查询数据库中是不是有这个人
  User.find({"user": user}, function (err, result) {
    if (err) {
      res.json({result: "-3"}); //服务器错误
      return;
    }
    if (result.length !== 0) {
      req.session.user = user;
      res.json({result: "1"}); // 验证成功
    } else {
      res.json({result: "-1"}); // 验证失败，邮箱错误
    }
  })
};

// 新建说说
exports.newMood = function (req, res, next) {

  // 先判断upload/moodImg文件夹是否存在，不存在就创建
  var avatarDir = fs.existsSync("./server/upload/moodImg");

  if (!avatarDir) {
    console.log('创建upload/moodImg文件夹');
    fs.mkdirSync("./server/upload/moodImg");
  }

  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {

    var time = new Date();
    var user = req.session.login.user;
    var moodText = fields.moodText;
    var moodImg = fields.moodImg;
    if (moodImg.length) {
      console.log('有图片');
      for (var i = 0; i < moodImg.length; i++) {
        console.log(moodImg[i]);
        var oldpath = path.normalize(__dirname + "/.." + moodImg[i]);
        var newName = time.getTime() + '(' + i + ')' + ".jpg";
        console.log(newName);
        var newpath = path.normalize(__dirname + "/../upload/moodImg") + "/" + newName;
        fs.renameSync(oldpath, newpath);
        moodImg[i] = "/upload/moodImg/" + newName;
      }
    }

    Mood.create({
      time: time,
      user: user,
      body: {
        text: moodText,
        img: moodImg
      }
    }, function (err, mood) {
      if (err) {
        res.json({result: "-3"}); //服务器错误
        return;
      }
      Log.create({
        type: 'mood',
        time: time,
        user: user,
        body: mood._id
      }, function (err1, log) {
        if (err1) {
          res.json({result: "-3"}); //服务器错误
          return;
        }
        console.log('发表说说成功');
        res.json({result: '1'});
      });
    })

  });

};

// 删除
exports.dl = function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var type = fields.type;
    var id = fields.id;

    if (type === 'mood') {
      Mood.remove({_id: id}, function (err) {
        if (err) {
          res.json({result: "-3"}); //删除失败
          return;
        }
        Log.remove({body: id}, function (err1) {
          if (err1) {
            res.json({result: "-3"}); //删除失败
            return;
          }
          console.log('删除成功');
          res.json({result: '1'});
        })
      });
    } else if (type === 'blog') {
      Blog.findOne({_id: id}, function (err, blog) {
        console.log(blog);
        if (blog.group) {
          BlogGroup.rmFromGroup({
            id: id,
            user: blog.user,
            groupName: blog.group
          }, function (err) {
            Blog.remove({_id: id}, function (err) {
              if (err) {
                res.json({result: "-3"}); //删除失败
                return;
              }
              Log.remove({body: id}, function (err1) {
                if (err1) {
                  res.json({result: "-3"}); //删除失败
                  return;
                }
                console.log('删除成功');
                res.json({result: '1'});
              })
            });
          });
        } else {
          Blog.remove({_id: id}, function (err) {
            if (err) {
              res.json({result: "-3"}); //删除失败
              return;
            }
            Log.remove({body: id}, function (err1) {
              if (err1) {
                res.json({result: "-3"}); //删除失败
                return;
              }
              console.log('删除成功');
              res.json({result: '1'});
            })
          });
        }

      });
    }

  });
};

// 添加评论
exports.addComment = function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var type = fields.type;
    var id = fields.id;
    var user = req.session.login.user;
    var content = fields.content;

    var pinglun = {
      id: id,
      body: {
        user: user,
        time: new Date(),
        content: content
      }
    };

    if (type === 'mood') {
      Mood.pinglun(pinglun, function (err) {
        if (err) {
          res.json({result: "-3"}); //服务器错误
          return;
        }
        console.log('评论成功');
        res.json({result: '1'});
      });
    } else if (type === 'blog') {
      Blog.pinglun(pinglun, function (err) {
        if (err) {
          res.json({result: "-3"}); //服务器错误
          return;
        }
        console.log('评论成功');
        res.json({result: '1'});
      });
    }

  });
};

// 删除评论
exports.dlComment = function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var type = fields.type;
    var id = fields.id;
    var commentId = fields.commentId;

    var pinglun = {
      id: id,
      commentId: commentId
    };

    if (type === 'mood') {
      Mood.dlPinglun(pinglun, function (err) {
        if (err) {
          res.json({result: "-3"}); //服务器错误
          return;
        }
        console.log('删除评论成功');
        res.json({result: '1'});
      });
    } else if (type === 'blog') {
      Blog.dlPinglun(pinglun, function (err) {
        if (err) {
          res.json({result: "-3"}); //服务器错误
          return;
        }
        console.log('删除评论成功');
        res.json({result: '1'});
      });
    }

  });
};

// 点赞
exports.thumbsUp = function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var type = fields.type;
    var id = fields.id;
    var status = fields.status;
    var user = req.session.login.user;
    var thumbsUp = {
      id: id,
      body: {
        user: user
      }
    };

    if (type === 'mood') {
      if (status) {
        Mood.cancelThumbsUp(thumbsUp, function (err) {
          if (err) {
            res.json({result: "-3"}); //服务器错误
            return;
          }
          console.log('取消点赞成功');
          res.json({result: '1'});
        });
      } else {
        Mood.thumbsUp(thumbsUp, function (err) {
          if (err) {
            res.json({result: "-3"}); //服务器错误
            return;
          }
          console.log('点赞成功');
          res.json({result: '1'});
        });
      }
    } else if (type === 'blog') {
      if (status) {
        Blog.cancelThumbsUp(thumbsUp, function (err) {
          if (err) {
            res.json({result: "-3"}); //服务器错误
            return;
          }
          console.log('取消点赞成功');
          res.json({result: '1'});
        });
      } else {
        Blog.thumbsUp(thumbsUp, function (err) {
          if (err) {
            res.json({result: "-3"}); //服务器错误
            return;
          }
          console.log('点赞成功');
          res.json({result: '1'});
        });
      }
    }

  });
};

// 获取空间动态
exports.getStatus = function (req, res, next) {
  var query = req.query; // 有user、all（是否显示所有好友的）、type

  console.log(query);

  var obj = {
    user: [query.user],
    type: query.type,
    page: query.page - 1,
    pageSize: query.pageSize
  };

  var status = [];

  if (query.all === 'true') {
    console.log('查找所有人');

    User.find({user: query.user}, 'friends', function (err, data) {
      if (err) {
        res.send('-3'); // 查询数据库出错
        return;
      }

      for (var i = 0; i < data[0].friends.length; i++) {
        obj.user.push(data[0].friends[i].user);
      }
      // obj.user.push.apply(obj.user, data.friends); // 合并数组

      // console.log(data[0].friends);

      mainFn(obj);
    })
  } else {
    console.log('查找个人');

    mainFn(obj);
  }

  function mainFn(obj) {
    Log.getTotal(obj, function (err, total) {
      Log.getStatus(obj, function (err, logs) {
        // res.send(logs);

        (function iterator(i) {
          //遍历结束
          if (i === logs.length) {
            console.log('遍历完成');
            res.json({
              result: '1',
              status: status,
              total: total.length
            });
            return;
          }
          if (logs[i].type === 'mood') {
            Mood.findById(logs[i].body, function (err, mood) {
              // status.push(mood);

              // 这里不能直接 moodData = mood，因为会导致后边的name等无法赋值上去，所以必须一个一个赋值；还有一种办法就是直接在Mood.js里添加name等schema占位，就可以直接赋值。
              var moodData = {};
              moodData._id = mood._id;
              moodData.type = mood.type;
              moodData.user = mood.user;
              moodData.time = mood.time;
              moodData.body = mood.body;
              moodData.thumbsUp = [];
              moodData.comments = [];

              User.findOne({user: moodData.user}, 'name avatar', function (err, user) {
                moodData.name = user.name;
                moodData.avatar = user.avatar;

                // 查询点赞里的用户的name和avatar
                (function iterator1(j) {
                  if (j === mood.thumbsUp.length) {

                    // 查询评论里的用户的name和avatar
                    (function iterator2(k) {
                      if (k === mood.comments.length) {
                        status.push(moodData);
                        iterator(i + 1);
                        return;
                      }
                      User.findOne({user: mood.comments[k].user}, 'name avatar', function (err, user) {
                        var comments = {
                          user: mood.comments[k].user,
                          name: user.name,
                          avatar: user.avatar,
                          time: mood.comments[k].time,
                          content: mood.comments[k].content,
                          _id: mood.comments[k]._id
                        };
                        moodData.comments.push(comments);
                        iterator2(k + 1);
                      })
                    })(0);
                    return;
                  }
                  User.findOne({user: mood.thumbsUp[j].user}, 'name', function (err, user) {
                    var thumbsUp = {
                      user: mood.thumbsUp[j].user,
                      name: user.name
                    };
                    moodData.thumbsUp.push(thumbsUp);
                    iterator1(j + 1);
                  })
                })(0);

              });
            })
          } else if (logs[i].type === 'blog') {
            Blog.findById(logs[i].body, function (err, blog) {
              var blogData = {};
              blogData._id = blog._id;
              blogData.type = blog.type;
              blogData.user = blog.user;
              blogData.time = blog.time;
              blogData.group = blog.group;
              blogData.body = blog.body;
              blogData.thumbsUp = [];
              blogData.comments = [];

              User.findOne({user: blogData.user}, 'name avatar', function (err, user) {
                blogData.name = user.name;
                blogData.avatar = user.avatar;

                // 查询点赞里的用户的name和avatar
                (function iterator1(j) {
                  if (j === blog.thumbsUp.length) {

                    // 查询评论里的用户的name和avatar
                    (function iterator2(k) {
                      if (k === blog.comments.length) {
                        status.push(blogData);
                        iterator(i + 1);
                        return;
                      }
                      User.findOne({user: blog.comments[k].user}, 'name avatar', function (err, user) {
                        var comments = {
                          user: blog.comments[k].user,
                          name: user.name,
                          avatar: user.avatar,
                          time: blog.comments[k].time,
                          content: blog.comments[k].content,
                          _id: blog.comments[k]._id
                        };
                        blogData.comments.push(comments);
                        iterator2(k + 1);
                      })
                    })(0);
                    return;
                  }
                  User.findOne({user: blog.thumbsUp[j].user}, 'name', function (err, user) {
                    var thumbsUp = {
                      user: blog.thumbsUp[j].user,
                      name: user.name
                    };
                    blogData.thumbsUp.push(thumbsUp);
                    iterator1(j + 1);
                  })
                })(0);

              });

            });
          }
        })(0);
      })
    });
  }
};

// 新建博客
exports.newBlog = function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var group = fields.group;
    var title = fields.title;
    var content = fields.content;
    var time = new Date();
    var user = req.session.login.user;

    var obj = {
      time: time,
      user: user,
      group: group,
      body: {
        title: title,
        content: content
      }
    };

    Blog.create(obj, function (err, blog) {
      if (err) {
        res.json({result: "-3"}); //服务器错误
        return;
      }
      var bgObj = {
        user: user,
        groupName: group,
        blogId: blog._id
      };
      if (group) {
        console.log('有添加分组');
        BlogGroup.addToGroup(bgObj, function (err1) {
          if (err1) {
            res.json({result: "-3"}); //服务器错误
            return;
          }
          Log.create({
            type: 'blog',
            time: time,
            user: user,
            body: blog._id
          }, function (err2, log) {
            if (err2) {
              res.json({result: "-3"}); //服务器错误
              return;
            }
            console.log('新建博客成功');
            res.json({result: '1', blogId: blog._id});
          });
        })
      } else {
        console.log('没有添加分组');
        Log.create({
          type: 'blog',
          time: time,
          user: user,
          body: blog._id
        }, function (err2, log) {
          if (err2) {
            res.json({result: "-3"}); //服务器错误
            return;
          }
          console.log('新建博客成功');
          res.json({result: '1', blogId: blog._id});
        });
      }
    });
  });
};

// 获取博客分组
exports.getBlogGroup = function (req, res, next) {
  var user = req.query.user;
  BlogGroup.findOne({user: user}, function (err, bg) {
    if (err) {
      res.json({result: "-3"}); //服务器错误
      return;
    }
    if (!bg) {
      res.json({result: "-1"}); //没有分组
    } else {
      res.json({result: "1", group: bg.blogGroup});
    }
  })
};

// 获取用户个人档
exports.getUserProfile = function (req, res, next) {
  var user = req.session.login.user;
  User.findOne({user: user}, 'avatar name email sex born city hobby label sign', function (err, user) {
    if (err) {
      res.json({result: "-3"}); //服务器错误
      return;
    }
    res.json({result: "1", user: user});
  });
};

// 更新用户个人档
exports.updateProfile = function (req, res, next) {
  var user = req.session.login.user;
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {

    // 先判断upload/avatar文件夹是否存在，不存在就创建
    var avatarDir = fs.existsSync("./server/upload/avatar");

    if (!avatarDir) {
      console.log('创建upload/avatar文件夹');
      fs.mkdirSync("./server/upload/avatar");
    }

    //得到表单之后做的事情
    var name = fields.name;
    var email = fields.email;
    var avatar = fields.avatar ? '/upload/avatar/' + user + '.jpg' : "/static/images/moren.jpg";
    var sex = fields.sex;
    var born = fields.born;
    var city = fields.city;
    var hobby = fields.hobby;
    var label = JSON.stringify(fields.label);
    var sign = fields.sign;

    User.update({user: user}, {
      $set: {
        name: name,
        email: email,
        avatar: avatar,
        sex: sex,
        born: born,
        city: city,
        hobby: hobby,
        label: label,
        sign: sign
      }
    }, function (err) {
      if (err) {
        res.send("-3"); //服务器错误
        return;
      }
      if (fields.avatar) {
        var oldpath = path.normalize(__dirname + "/.." + fields.avatar);
        var newName = user + ".jpg";
        var newpath = path.normalize(__dirname + "/../upload/avatar") + "/" + newName;
        fs.rename(oldpath, newpath);
      }
      console.log('更新个人档成功');
      req.session.login = {
        user: user,
        name: name,
        avatar: avatar
      };
      res.json({result: "1"}); // 更新个人档成功
    })

  });


};

// 新建相册
exports.newAlbum = function (req, res, next) {
  // 先判断upload/album文件夹是否存在，不存在就创建
  var avatarDir = fs.existsSync("./server/upload/album");

  if (!avatarDir) {
    console.log('创建upload/album');
    fs.mkdirSync("./server/upload/album");
  }

  var user = req.session.login.user;
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var time = new Date();
    var body = fields.body;

    for (var i = 0; i < body.photos.length; i++) {
      var oldpath = path.normalize(__dirname + "/.." + body.photos[i]);
      var newName = time.getTime() + '(' + i + ')' + ".jpg";
      var newpath = path.normalize(__dirname + "/../upload/album") + "/" + newName;
      fs.renameSync(oldpath, newpath);
      body.photos[i] = "/upload/album/" + newName;
    }

    Album.create({
      time: time,
      user: user,
      body: {
        name: body.name,
        cover: body.photos[0],
        desc: body.desc,
        photos: body.photos
      }
    }, function (err, album) {
      if (err) {
        res.send("-3"); //服务器错误
        return;
      }
      res.json({result: '1', albumId: album._id});
    })
  });
};

// 获取相册
exports.getAlbum = function (req, res, next) {
  var query = req.query;
  var user = query.user;

  Album.find({user: user})
    .sort('-time')
    .exec(function (err, album) {
      if (err) {
        res.send("-3"); //服务器错误
        return;
      }
      res.json({result: '1', album: album});
    });
};

// 通过相册id获取相册里的图片
exports.getAlbumById = function (req, res, next) {
  var id = req.query.id;
  Album.findOne({_id: id}, function (err, album) {
    if (err) {
      res.send("-3"); //服务器错误
      return;
    }
    res.json({result: '1', album: album});
  });
};

// 获取好友
exports.getFriends = function (req, res, next) {
  var user = req.session.login.user;
  User.findOne({user: user}, 'friends', function (err, user1) {
    var friends = [];
    for (var i = 0; i < user1.friends.length; i++) {
      friends.push(user1.friends[i].user);
    }

    var userData = [];
    var notFriend = [];
    User.find({user: {'$in': friends}}, 'user name avatar sex city friends', function (err, user2) {
      if (err) {
        res.send('-3');
        return;
      }

      for (var i = 0; i < user2.length; i++) {
        var frd = {};
        frd.user = user2[i].user;
        frd.name = user2[i].name;
        frd.avatar = user2[i].avatar;
        frd.sex = user2[i].sex;
        frd.city = user2[i].city;
        frd.eachFocus = false;

        for (var j = 0; j < user2[i].friends.length; j++) {
          if (user === user2[i].friends[j].user) {
            frd.eachFocus = true;
          }
        }
        userData.push(frd);
      }

      User.find({user: {'$nin': friends}}, 'user name avatar sex city', function (err, user3) {
        if (err) {
          res.send('-3');
          return;
        }

        for (var i = 0; i < user3.length; i++) {
          if (user3[i].user !== user) {
            notFriend.push(user3[i]);
          }
        }
        res.json({result: '1', isFriend: userData, notFriend: notFriend});
      });

    })
  })
};

// 添加好友
exports.addFriend = function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var friend = fields.friend;
    var user = req.session.login.user;

    var obj = {
      user: user,
      body: {
        user: friend
      }
    };

    User.addFriend(obj, function (err) {
      if (err) {
        res.json({result: "-3"}); //服务器错误
        return;
      }
      res.json({result: '1'});
    });

  });
};

// 删除好友
exports.dlFriend = function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var friend = fields.friend;
    var user = req.session.login.user;

    var obj = {
      user: user,
      friend: friend
    };

    User.dlFriend(obj, function (err) {
      if (err) {
        res.json({result: "-3"}); //服务器错误
        return;
      }
      res.json({result: '1'});
    });

  });
};

// 新建留言
exports.newMsg = function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var user = fields.user;
    var author = req.session.login.user;
    var content = fields.content;

    var message = {
      user: user,
      body: {
        author: author,
        time: new Date(),
        content: content
      }
    };

    User.message(message, function (err) {
      if (err) {
        res.json({result: "-3"}); //服务器错误
        return;
      }
      console.log('留言成功');
      res.json({result: '1'});
    });

  });
};

// 获取留言内容
exports.getMsg = function (req, res, next) {
  var query = req.query;
  var user = query.user;

  var messages = [];

  User.findOne({user: user}, 'messages', function (err, user) {
    if (err) {
      res.send("-3"); //服务器错误
      return;
    }

    (function iterator(i) {

      if (i === user.messages.length) {
        res.json({result: '1', messages: messages});
        return;
      }

      var msg = user.messages[i];
      var message = {};
      message._id = msg._id;
      message.author = msg.author;
      message.time = msg.time;
      message.content = msg.content;
      message.name = '';
      message.avatar = '';

      User.findOne({user: msg.author}, 'name avatar', function (err, user) {
        message.name = user.name;
        message.avatar = user.avatar;
        messages.push(message);
        iterator(i + 1);
      })
    })(0);

  })
};

// 删除留言
exports.dlMsg = function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var user = fields.user;
    var messageId = fields.messageId;

    var message = {
      user: user,
      messageId: messageId
    };

    User.dlMsg(message, function (err) {
      if (err) {
        res.json({result: "-3"}); //服务器错误
        return;
      }
      res.json({result: '1'});
    });
  });
};

// 获取博客
exports.getBlogs = function (req, res, next) {
  var query = req.query;

  var obj = {
    user: [query.user],
    type: 'blog',
    page: query.page - 1,
    pageSize: query.pageSize
  };

  var blogs = [];

  Log.getTotal(obj, function (err, total) {
    Log.getStatus(obj, function (err, logs) {
      (function iterator(i) {
        //遍历结束
        if (i === logs.length) {
          console.log('遍历完成');
          res.json({
            result: '1',
            blogs: blogs,
            total: total.length
          });
          return;
        }

        Blog.findById(logs[i].body, 'time body', function (err, blog) {
          blogs.push(blog);
          iterator(i + 1);
        });

      })(0);
    })
  });
};

// 获取博客详情
exports.getBlogDetail = function (req, res, next) {
  var blogId = req.query.blogId;

  Blog.findById(blogId, function (err, blog) {
    if (err) {
      res.json({result: "-3"}); //服务器错误
      return;
    }

    var blogData = {};
    blogData._id = blog._id;
    blogData.type = blog.type;
    blogData.user = blog.user;
    blogData.time = blog.time;
    blogData.group = blog.group;
    blogData.body = blog.body;
    blogData.thumbsUp = [];
    blogData.comments = [];

    // 查询点赞里的用户的name和avatar
    (function iterator1(j) {
      if (j === blog.thumbsUp.length) {

        // 查询评论里的用户的name和avatar
        (function iterator2(k) {
          if (k === blog.comments.length) {
            res.json({result: '1', blog: blogData});
            return;
          }
          User.findOne({user: blog.comments[k].user}, 'name avatar', function (err, user) {
            var comments = {
              user: blog.comments[k].user,
              name: user.name,
              avatar: user.avatar,
              time: blog.comments[k].time,
              content: blog.comments[k].content,
              _id: blog.comments[k]._id
            };
            blogData.comments.push(comments);
            iterator2(k + 1);
          })
        })(0);
        return;
      }
      User.findOne({user: blog.thumbsUp[j].user}, 'name', function (err, user) {
        var thumbsUp = {
          user: blog.thumbsUp[j].user,
          name: user.name
        };
        blogData.thumbsUp.push(thumbsUp);
        iterator1(j + 1);
      })
    })(0);

  });
};

// 修改博客
exports.modifyBlog = function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    // var group = fields.group;
    var id = fields.id;
    var title = fields.title;
    var content = fields.content;

    Blog.update({_id: id}, {$set:{ body: { title: title, content: content}}}, function (err) {
      if (err) {
        res.json({result: "-3"}); //服务器错误
        return;
      }
      console.log('更新博客成功');
      res.json({result: '1'});
    });
  });
};

// 检查好友关系
exports.chkFriend = function (req, res, next) {
  var friend = req.query.friend;

  var user = req.session.login.user;
  User.findOne({user: user}, 'friends', function (err, user1) {
    var flag = false;
    for (var i = 0; i < user1.friends.length; i++) {
      if (friend === user1.friends[i].user) {
        flag = true;
        break;
      }
    }

    if (flag) {
      var eachFocus = false;
      User.findOne({user: friend}, 'friends', function (err, user2) {
        if (err) {
          res.send('-3');
          return;
        }

        for (var j = 0; j < user2.friends.length; j++) {
          if (user === user2.friends[j].user) {
            eachFocus = true;
            break;
          }
        }

        res.json({result: '1', isFriend: true, eachFocus: eachFocus});
      })
    } else {
      res.json({result: '1', isFriend: false});
    }

  })
};
