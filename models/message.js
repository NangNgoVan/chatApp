var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  //
});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;
