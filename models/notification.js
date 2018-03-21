var mongoose = require('mongoose');

var notificationSchema = mongoose.Schema({
  uid: {type: String, required: true}, // id người dùng
  msg: {type: String}, // nội dung thông báo
  created_at: {type: Date, default: Date.now}, // ngày tạo thông báo
  read_at: {type: Date} // ngày đọc thông báo
});

var Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;