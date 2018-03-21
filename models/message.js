var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  sid:{type: String, required: true}, // id người gửi
  rid:{type: String, required: true}, // id người nhận
  un_read: {type: Boolean, default: false}, // tin nhắn đã được đọc?
  send_at: {type: Date, default: Date.now}, // ngày gửi tin nhắn
  msg: {type: String}, // nội dung tin nhắn
  meta_data: {type: String},// dữ liệu đa phương tiện
  status: {type: String, default: 'saved'},// trạng thái tin nhắn (saved->read->seen)
  update_at: {type: Date, default: Date.now}, // ngày cập nhật trạng thái
});

messageSchema.pre('save', function(done){
  var self = this;
  done();
});

// cập nhật trạng thái của các tin nhắn
messageSchema.statics.updateState = function(mids, done){
  Message.find({
    _id: {
      $in: mids
    }
  }, function(err, messages){
    if(err) return done({success: false, msg: err.message});
    if(messages){
      var results = [];
      messages.forEach(message => {
        //if(message.status == 'seen') continue;
        if(message.status == 'saved') message.status = 'read'
        else if(message.status == 'read') message.status = 'seen';
      
        message.update_at = Date.now;

        message.save().then(function(message){
          results.push(message);
        });
      });
      return done({success: true, data: results});
    };
    return done({success: false, msg: 'Các tin nhắn không tồn tại!'});
  });
}

// lưu tin nhắn
messageSchema.statics.saveMessage = function(data, done){
  var self = this;
  var message = new Message({sid: data.uid, rid: data.rid, msg: data.msg});
  message.save(function(err){
    if(err) return done({success: false, msg: err.message})
    return done({success: true, data: message});
  });
}

// đếm tin nhắn chưa đọc
messageSchema.statics.countUnreadMessage = function(contacts, done){
  // ...
}

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;
