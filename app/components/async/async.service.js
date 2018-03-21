angular.module('async')
  .factory('asyncService', ['authService', function(authService){
  	// connect socket.
    var token = authService.token;
    var uid = authService.uid;
    //var url = 'http://localhost:3000';
    var url = 'https://glacial-anchorage-67038.herokuapp.com'
  	var socket = io.connect(url+'?uid='+uid
      + '&&token=' + token);
    
  	socket.reconnect = function(){
  	  socket.open();
  	}

    return socket;

  }]);