var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var SALT_FACTOR = 10;

var userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true}, // tên tài khoản
  name: {type: String},  // tên đầy đủ
  avatar: {type: String}, // ảnh đại diện
  password: {type: String, required: true}, // mật khẩu
  activate_digest: {type: String}, // mã kích hoạt
  digest_send_at: {type: Date}, // ngày gửi mã kích hoạt
  activated: {default: false}, // đã kích hoạt
  contacts:{type: Object}, // danh sách liên hệ
  createAt: {type: Date, default: Date.now} // ngày tạo tài khoản
});

var noop = function(){};

userSchema.pre('save', function(done){
  var user = this;
  //
  bcrypt.genSalt(SALT_FACTOR, function(err, salt){
  	if(err) return done(err);
    bcrypt.hash(user.password, salt, noop, function(err, hasedPassword){
      if(err) return done(err);
      user.password = hasedPassword;
      done();
    });
  });
});

userSchema.methods.checkPassword = function(pass, done){
  bcrypt.compare(pass, this.password, function(err, isMatch){
  	done(err, isMatch);
  });
};

// tải danh sách người dùng từ ids
userSchema.statics.loadContacts = function(uids, done){
  var contacts = [];
  User.find({
    _id: {$in: uids}
  }, function(err, users){
    if(err) return done({success: false, msg: "Đã xảy ra lỗi!"})
    return done({success: true, users: users});
  });
}

var User = mongoose.model('User', userSchema);

module.exports = User;