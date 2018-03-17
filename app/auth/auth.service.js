angular.module('auth')
  .service('authService', ['$http', '$rootScope', '$window', '$cookies',
  function($http, $rootScope, $window, $cookies){
    var self = this;

    self.token = $cookies.get('token');
    self.uid = $cookies.get('uid');

    self.auth = function(data, callback){
      $http.post('/api/auth/login', data, 'contenttype').then(function(res){
      	//alert('thành công');
        self.token = res.data.token;
        self.uid = res.data.uid;
        $cookies.put('token', self.token);
        $cookies.put('uid', self.uid);

      	return callback(res.data);
      }, function(err){
        return callback(err.data);
      });
    };

    self.logOut = function(){
        self.token = null;
        $rootScope.$broadcast('logged_out', null);

        $cookies.remove('token');
        $cookies.remove('uid');

        $window.location.href = '#!login';
      }
  }]);