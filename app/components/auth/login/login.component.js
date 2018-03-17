angular.module('login', ['ngCookies'])
  .component('login', {
  	templateUrl: 'components/auth/login/login.template.html',
  	controller: function(loginService, $scope, $cookies, $window){
  	  $scope.auth = function(){
        loginService.logIn($scope.user, function(data){
  	  	  if(data.token != undefined) {
  	  	  	// lưu token
  	  	  	$cookies.put('token', data.token);
  	  	  	$window.location.href = '#!board';
  	  	  }
  	  	  else {
  	  	  	// thông báo lỗi
            alert(data.message);
  	  	  }
  	    });
  	  }
    }
  });