angular.module('board')
  .component('board',{
  	templateUrl: 'board/board.template.html',
  	controller: function(authService, boardService, $window, $scope, $rootScope){
      if(authService.token == null) {$window.location.href = '#!/login'}
      else{
        //asyncService.connect(authService.uid, authService.token); // đồng bộ.
        $scope.user = {};
        $scope.user = boardService.currentUser(authService.token, function(udata){
          $scope.user = udata;
          $rootScope.$broadcast('logged_in', udata);
        });
      };
  	}
  });