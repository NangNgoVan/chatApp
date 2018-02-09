angular.module('signup')
  .component('signup', {
  	templateUrl: 'components/auth/signup/signup.template.html',
  	controller: function(signupService, $scope){
  	  $scope.createUser = function(){
        signupService($scope.user, function(data){
  	  	  if(data.success){
  	  	    alert(data.data);
  	      }
  	  	  else {
  	  	    alert(data.message);
  	  	  }
  	    });
  	  }
  	}
  })