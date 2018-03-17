angular.module('board')
  .service('boardService', ['$http', function($http){
  	var self = this;

  	self.currentUser = function(token, callback){
  	   var config = {
            headers: {
              token: token
            }
       }
        $http.get('/api/user', config).then(function(res){
            if(res.data.success){
              callback(res.data.data);
            }
            else callback(null);
          });
  	}
  }])