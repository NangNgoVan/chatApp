angular.module('signup')
  .factory('signupService', ['$http', function($http){
  	return function(data, callback){
  	  $http.post('/api/auth/signup', data, 'contenttype').then(function(res){
        return callback(res.data);
  	  }, function(err){
  	  	return callback(err.data);
  	  })
  	};
  }]);
