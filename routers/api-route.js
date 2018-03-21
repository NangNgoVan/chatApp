var express = require('express');
var path = require('path');
var router = express.Router();

var User = require('../models/user');
var Message = require('../models/message');

var Jwt = require('../helper/jwt.js');

var options = {
  root: '',
  dotfiles: 'deny'
}

router.use(function(req, res, next){
  //
  next();
});

// tải tin nhắn
router.get('/api/messages/:rid', function(req, res){
  var token = req.headers.token;
  var rid = req.params.rid;
  if(!token) return res.json({success: false, msg: 'token không hợp lệ!'});
  if(!rid) return res.json({success: false, msg: 'rid không hợp lệ!'});
  {
    Jwt.checkToken(token, function(data){
      if(data.success){
        var uid = data.data._id;
        Message.find({
          $or:[
            {$and: [{sid: uid}, {rid: rid}]},
            {$and: [{sid: rid}, {rid: uid}]}
          ]
        }, function(err, messages){
          if(err) return res.json({success: false, msg: "Đã xảy ra lỗi!"});
          res.json({success:true, messages: messages});
        })
      }
      else{
        // lỗi xác thực
        res.json({success: false, msg: 'token không hợp lệ'});
      }
    });
  }
});

// get all users
router.get('/api/users', function(req, res){
  User.find({}, function(err, users){
    res.json(users);
  });
});
  
// get a user auth
router.get('/api/user', function(req, res){
  var token = req.headers.token;
  Jwt.checkToken(token, function(data){
    res.json(data);
  });
});

router.get('/api/user/:uid', function(req, res){
  var uid = req.params.uid;
  
  if(uid == undefined) res.json({success: false, message: "Id không hợp lệ!"})
  else {
    User.findById(uid, function(err, user){
      if(err) res.json({success: false, message: "Lỗi nội bộ! ("+err+")"})
      else if(!user) res.json({success: false, message: "Không tồn tại!"})
      else res.json({success: true, data: {name: user.name, avatar: user.avatar}});
    });
  }
});

router.post('/api/auth/login', function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({email: email}, function(err, user){
    if(err) return next(err);

    if(!user) {
      return res.json({success: false, message: "Tài khoản không tồn tại!"});
    }
    else {
      if(user.checkPassword(password, function(err, isMatch){
        if(err) return res.json({error: err});
        if(isMatch) {
          const tokenData = {
            exp: Math.floor(Date.now() / 1000) + 3600,
            data: user
          }
          var token = Jwt.sign(tokenData, process.env.SECRET_TOKEN_STRING);
          res.json({
            success: true,
            token: token,
            uid: user._id
          });
        }
        else return res.json({success: false, message: "Sai mật khẩu"});
      }));
    }
  });
});

router.post('/api/auth/signup', function(req, res, next){
  //
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({email: email}, function(err, user){
    if(err) {return next(err)};
    
    if(user){
      console.log(user);
      return res.json({success: false, message: "Người dùng đã tồn tại!"});
    }

    var newUser = new User({
      email: email,
      password: password
    });

    console.log(newUser);

    newUser.save().then(function(userSaved){
      //console.log(userSaved);
      res.json({success: true, message: 'Lưu thành công!', data: userSaved});
    });
  });  
});

module.exports = router;