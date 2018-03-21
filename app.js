const express = require('express');
var path = require('path');
const app = express();

require('dotenv').config();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_SESSION_STRING,
  resave: true,
  saveUninitialized: true
}));

var mongoose = require('mongoose');
var dbStr = 'mongodb://'+
  process.env.DB_USER+':'+
  process.env.DB_PASSWORD+'@'+
  process.env.DB_HOST;

mongoose.connect(dbStr);
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connect error!'));
db.once('open', function(){console.log('Connect success!')});

var apiRoutes = require('./routers/api-route');

app.use(express.static(path.join(__dirname,'public')));

app.use(express.static(path.join(__dirname,'app')));

app.get('/', function(req, res){
  res.sendFile('index.html', {root: path.join('app')});
});

app.use(apiRoutes);

var errorHandle = function (req, res, next){
  //console.log(req);
  res.sendFile('error.html', {root: path.join('views')});
};
app.use(errorHandle);

var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);

var Message = require('./models/message');

var users = []; //users online
var sockets = []; //sockets each user
//var usersInfos = []; // users infos

io.on('connection', function (socket) {
  console.log(socket.id + " has connected!");
  let uid = socket.handshake.query.uid;
  //console.log(uid);

  users[socket.id] = uid;
  sockets[socket.id] = socket;

  // người dùng online
  // nếu đã có trong users, gửi [uid]
  // nếu online lần đầu tiên, gửi tất cả
  
  socket.broadcast.emit('user_online', [uid]);

   var usersOnline = [];

    for(item in users){
      var found = usersOnline.find(x=>{
        if(x === users[item]) return true;
      });
      if(!found) usersOnline.push(users[item]);
    }

  io.sockets.emit('user_online', usersOnline);
  //console.log(usersOnline);

  socket.on('deliver_message', function(data){
    console.log(data);
  	// lưu tin nhắn vào db
    Message.saveMessage(data, function(msg){
      console.log(msg);
      if(!msg.success){
        // lỗi ko luu dc
        console.log(msg.msg);
      }
      else {
        for(x in users){
          // người gửi
          if(users[x] == data.uid){
            sockets[x].emit('send_message', msg.data);
          }
          else if(users[x] == data.rid && data.uid != data.rid){
            sockets[x].emit('receive_message', msg.data);
          }
        }
      };
    });
  });

  socket.on('deliver_seen_event', function(data){
    // cập nhật trạng thái tin nhắn trên db.
    //
    for(x in users){
      if((users[x] == data.rid && data.uid != data.rid)){
        sockets[x].emit('seen_event', data.uid);
      }
      if(users[x] == data.uid){
        sockets[x].emit('seen_event', data.rid);
      }
    }
  });


  socket.on('disconnect', function(){
  	console.log(socket.id+" has disconnected!");

    var uid = users[socket.id];

    delete users[socket.id];
    delete sockets[socket.id];
    
    var found = false;
    found = users.find(function(x){
      if(x == uid) return true;
    });
    if(!found){
      //console.log(usersInfos[uid]);
      io.sockets.emit('user_offline', [uid]);
    }
  });
});

server.sendNotifications = function(uid, notifications){
  var socketID = null;
  for(x in users){
    if(users[x] == uid){
      socketID = x;
      return;
    }
  }
  if(socketID != null)
    sockets[socketID].emit('notifications', notifications);
}

module.exports = server;