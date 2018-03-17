angular.module('board')
  .component('board',{
  	templateUrl: 'board/board.template.html',
  	controller: function(authService, $window, $scope, $rootScope){

      if(!authService.loggedIn()) $window.location.href = '#!/login'
      else{
        // lấy dữ liệu của người dùng hiện tại và hiển thị
        $scope.user = {};
        authService.getUser(function(data){
          $scope.user = data
          $rootScope.$broadcast('logged', data);
        });
      };

  	}
  });