angular.module('login')
  .factory('tokenService', ['$http', function($http){
    return function(data, callback){
      $http.post('/api/auth/login', data, 'contenttype').then(function(res){
      	//alert('thành công');
      	return callback(res.data);
      }, function(res){
        return callback(res.data);
      });
    };
  }]);