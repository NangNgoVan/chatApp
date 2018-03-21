angular.module('board')
  .controller('boardCtrl', [
  	'authService',
  	'boardService',
  	'$window',
  	'$scope',
  	'$rootScope',
  	'$mdDialog', function(authService, boardService, $window, $scope, $rootScope, $mdDialog){
      if(authService.token == null) {$window.location.href = '#!/login'}
      else{
        //asyncService.connect(authService.uid, authService.token); // đồng bộ.
        $scope.user = {};

        $scope.user = boardService.currentUser(authService.token, function(udata){
          $scope.user = udata;
          $rootScope.$broadcast('logged_in', udata);
        });

        $scope.showUsersDialog = function(ev){
          $mdDialog.show({
            controller: 'usersDialogCtrl',
            templateUrl: 'board/user.dialog.template.html',
            parent: angular.element(document.querySelector('.container-fluid')),
            targetEvent: ev,
            clickOutsideToClose:true,
            // fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
          })
        }
      };
  	}])
  .controller('usersDialogCtrl', ['$mdDialog', '$scope', function($mdDialog, $scope){
  	// $scope.title = 'Danh sách người dùng'
    $scope.closeDialog = function(){
      $mdDialog.hide();
    }
  }])