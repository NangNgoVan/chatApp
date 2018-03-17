angular.module('signup')
  .component('signup', {
  	templateUrl: 'auth/signup/signup.template.html',
  	controller: function(signupService, $scope, $window){
  	  $scope.createUser = function(){
        signupService($scope.user, function(data){
  	  	  if(data.success){
  	  	    //alert(data.data);
  	  	    $window.location.href = '#!board';
  	      }
  	  	  else {
  	  	    alert(data.message);
  	  	  }
  	    });
  	  }
  	}
  })