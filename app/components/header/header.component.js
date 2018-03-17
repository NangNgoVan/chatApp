angular.module('header')
  .component('header',{
  	templateUrl: 'components/header/header.template.html',
  	controller: function(authService, $scope){
  	  $scope.loggedIn = false;
  	  $scope.$on('logged', function(events, args){
        $scope.loggedIn = authService.loggedIn();
        $scope.user = args;
  	  });
  	}
  })