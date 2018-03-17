angular.module('auth')
     .service('authService', function($http, $cookies, $window, $rootScope){
     	this.loggedIn = function(){
     	  return ($cookies.get('token') != undefined)? true:false;
     	}

     	this.user = {};

    	this.getUser = function(callback){
          var config = {
  	  	    headers: {
  	  	      token: $cookies.get('token')
  	  	    }
  	      }
  	      $http.get('/api/user', config).then(function(res){
            if(res.data.success){
              callback(res.data.data);
            }
            else callback(null);
  	      });
    	};

    	this.logOut = function(){
    	  $cookies.remove('token');
          $rootScope.$broadcast('logged');
          $window.location.href = '#!login';
    	}
    });