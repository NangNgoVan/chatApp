angular.module('login')
  .service('loginService', ['$http', function($http){
    this.logIn = function(data, callback){
      $http.post('/api/auth/login', data, 'contenttype').then(function(res){
      	//alert('thành công');
      	return callback(res.data);
      }, function(res){
        return callback(res.data);
      });
    };
  }]);