angular.module('async')
  .service('asyncService', ['authService', function(authService){
  	// connect socket.
    var token = authService.token;
    var uid = authService.uid;
  	var socket = io.connect('http://localhost:3000?uid='+uid
      + '&&token=' + token);

    return socket;

  }]);