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
var dbStr = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@'+process.env.DB_HOST;

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
  res.sendFile('error.html', {root: path.join('views')});
};
app.use(errorHandle);

var server = require('http').Server(app);
var io = require('socket.io')(server);

var users = []; //users online
var sockets = []; //sockets each user

io.on('connection', function (socket) {
  console.log(socket.id + " has connected!");
  let uid = socket.handshake.query.uid;
  
  if(sockets[uid] == undefined) {
    sockets[uid] = [];
    sockets[uid].push(socket);
  }
  else sockets[uid].push(socket);

  socket.on('deliver_message', function(data){
  	//console.log(data);
  	// lưu tin nhắn vào db

    // gửi cho người gửi
    if(sockets[data.uid] != undefined) {
      for(var i = 0; i < sockets[data.uid].length; i++){
        sockets[data.uid][i].emit('send_message', data);
      }
    }
    
    // gửi cho người nhận nếu online trừ chính mình
  	if(sockets[data.rid] != undefined && (data.uid != data.rid)) {
      for(var i = 0; i < sockets[data.rid].length; i++){
        // if(data.rid == data.uid) {
        //   sockets[data.rid][i].emit('send_message', data);
        //   continue;
        // }
  	    sockets[data.rid][i].emit('receive_message', data);
      }
    }
  });

  socket.on('disconnect', function(){
  	console.log(socket.id+" has disconnected!");
  });
});

var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Listening on port 3000!');
});