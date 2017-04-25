//引入db和md5文件
var formidable = require("formidable");
var db = require('../models/db.js');
var md5 = require('../models/md5.js');
var path = require("path");
var fs = require("fs");

var svgCaptcha = require('svg-captcha');

var User = require('../models/User.js');

//注册业务
// exports.doRegist = function (req, res, next) {
//   //得到用户填写的东西
//   var form = new formidable.IncomingForm();
//   form.parse(req, function (err, fields, files) {
//     //得到表单之后做的事情
//     var user = fields.user;
//     var name = fields.name;
//     var pass = fields.pass;
//     var email = fields.email;
//     var avatar = fields.avatar || "moren.jpg";
//     var sex = fields.sex;
//     var born = fields.born;
//     var city = fields.city;
//     var hobby = fields.hobby;
//     var label = fields.label;
//     var sign = fields.sign;
//
//     //查询数据库中是不是有这个人
//     db.find("users", {"user": user}, function (err, result) {
//       if (err) {
//         res.send("-3"); //服务器错误
//         return;
//       }
//       if (result.length !== 0) {
//         res.send("-1"); //被占用
//         return;
//       }
//       //设置md5加密
//       pass = md5(md5(pass) + "考拉");
//       //现在可以证明，用户名没有被占用
//       db.insertOne("users", {
//         "user": user,
//         "name": name,
//         "pass": pass,
//         "email": email,
//         "avatar": avatar,
//         "sex": sex,
//         "born": born,
//         "city": city,
//         "hobby": hobby,
//         "label": label,
//         "sign": sign
//       }, function (err, result) {
//         if (err) {
//           res.send("-3"); //服务器错误
//           return;
//         }
//
//         res.send("1"); //注册成功，写入session
//       })
//     })
//   });
// };
// 使用mongoose进行注册业务
exports.doRegist = function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    //得到表单之后做的事情
    var user = fields.user;
    var name = fields.name;
    var pass = fields.pass;
    var email = fields.email;
    var avatar = fields.avatar || "moren.jpg";
    var sex = fields.sex;
    var born = fields.born;
    var city = fields.city;
    var hobby = fields.hobby;
    var label = fields.label;
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
        console.log('注册成功');
        req.session.login = user;
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
// exports.findUser = function (req, res, next) {
//   var user = req.params["user"];
//   //查询数据库中是不是有这个人
//   db.find("users", {"user": user}, function (err, result) {
//     if (err) {
//       res.send("-3"); //服务器错误
//       return;
//     }
//     if (result.length !== 0) {
//       res.send("-1"); //被占用
//     } else {
//       res.send("1");
//     }
//   });
// };
// 使用mongoose查找数据库中是否有这个用户
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
      res.send("1");
    }
  })
};

// 上传头像
exports.uploadAvatar = function (req, res, next) {
  // 先判断upload/avatar文件夹是否存在，不存在就创建
  var uploadDir = fs.existsSync("./upload");
  var avatarDir = fs.existsSync("./upload/avatar");

  if (!uploadDir) {
    console.log('创建upload文件夹');
    fs.mkdirSync("./upload");
  }

  if (!avatarDir) {
    console.log('创建upload/avatar文件夹');
    fs.mkdirSync("./upload/avatar");
  }


  var form = new formidable.IncomingForm();
  form.uploadDir = path.normalize(__dirname + "/../upload/avatar");
  form.parse(req, function (err, fields, files) {
    // console.log(files);
    var oldpath = files.avatar.path;
    var newName = new Date().getTime() + ".jpg";
    var newpath = path.normalize(__dirname + "/../upload/avatar") + "/" + newName;
    fs.rename(oldpath, newpath, function (err) {
      if (err) {
        res.send("失败");
        return;
      }
      res.send({'id': 101, 'path': '/upload/avatar/' + newName});
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
        req.session.login = user;
        req.session.user = user;
        res.json({result: "1", login: {user: user, name: result[0].name, avatar: result[0].avatar, visits: result[0].visits}}); // 登录成功
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

    User.find({"user": login}, 'name avatar visits', function (err, result) {
      if (err) {
        res.json({result: "-3"}); // 服务器错误
        return;
      }
      var isLoginUser = true;
      if (user !== '' && user !== login) {
        User.find({"user": user}, 'name avatar visits', function (err, result1) {
          if (result1.length === 0) {
            res.json({result: "-2"}); // 没有这个用户
          } else {
            isLoginUser = false;

            res.json({result: "1", login: {user: login, name: result[0].name, avatar: result[0].avatar, visits: result[0].visits}, user: {user: user, name: result1[0].name, avatar: result1[0].avatar, visits: result1[0].visits}, isLoginUser: isLoginUser});
          }
        });
      } else {
        res.json({result: "1", login: {user: login, name: result[0].name, avatar: result[0].avatar, visits: result[0].visits}, isLoginUser: isLoginUser});
      }
    });
  } else {
    res.json({result: '-1'});
  }
};

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
