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

app.use(express.static(path.join(__dirname,'app')));

app.get('/', function(req, res){
  res.sendFile('index.html', {root: path.join('app')});
});

app.use(apiRoutes);

var errorHandle = function (req, res, next){
  res.sendFile('error.html', {root: path.join('views')});
};
app.use(errorHandle);

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port 3000!');
});