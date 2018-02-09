var express = require('express');
var path = require('path');
var router = express.Router();

var User = require('../models/user');

var jwt = require('jsonwebtoken');

var options = {
  root: '',
  dotfiles: 'deny'
}

router.use(function(req, res, next){
  //
  next();
});

// get all users
router.get('/api/users', function(req, res){
  User.find({}, function(err, users){
    res.json(users);
  });
});
  
// get a user
router.get('/api/user', function(req, res){
  var token = req.headers.token;
  if(token){
    jwt.verify(token, process.env.SECRET_TOKEN_STRING, function(err, decoded){
      if(err){
        res.json({success: false, message: err.message});
      }

      var user = User.findOne({email: decoded.data.email}, function(err, user){
        if(err) res.json({success: false, message: "Lỗi chưa xác định!"});
        res.json({success: true, data: user});
      });
    })
  }
  else {
    res.json({success: false, message: "token không hợp lệ"});
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
          var token = jwt.sign(tokenData, process.env.SECRET_TOKEN_STRING);
          res.json({
            success: true,
            token: token
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

  //res.redirect('/');
});

module.exports = router;