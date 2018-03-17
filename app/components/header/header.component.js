angular.module('header')
  .component('header', {
  	templateUrl: 'components/header/header.template.html',
  	controller: function(authService, $scope){
  	  $scope.loggedIn = false;

      $scope.$on('logged_in', function(events, args){
        $scope.loggedIn = true;
        $scope.user = args;
      });

  	  $scope.$on('logged_out', function(events, args){
        $scope.loggedIn = false;
        $scope.user = args;
  	  });
  	}
  })