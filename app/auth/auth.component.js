angular.module('auth')
  .component('auth', {
  	templateUrl: 'auth/auth.template.html',
  	controller: function(authService, $scope, $cookies, $window){
      
  	  $scope.auth = function(){
        authService.auth($scope.user, function(data){
  	  	  if(data.token != undefined) {
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