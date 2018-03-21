var jwt = require('jsonwebtoken');
var User = require('../models/user');

jwt.checkToken = function(token, callback){
  if(token){
  	jwt.verify(token, process.env.SECRET_TOKEN_STRING, function(err, decoded){
      if(err){
        return callback({success: false, message: err.message});
      }

      User.findOne({email: decoded.data.email}, function(err, user){
        if(err) return callback({success: false, message: "Lỗi chưa xác định!"});
        return callback({success: true, data: user});
      });
    })
  }
  else return callback({});
}

module.exports = jwt;