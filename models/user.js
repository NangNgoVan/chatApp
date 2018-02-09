var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var SALT_FACTOR = 10;

var userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  activate_digest: {type: String},
  digest_send_at: {type: Date},
  createAt: {type: Date, default: Date.now},
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

var User = mongoose.model('User', userSchema);

module.exports = User;