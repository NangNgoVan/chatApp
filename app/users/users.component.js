angular.module('users')
  .component('users',{
    templateUrl: 'users/users.template.html',
    controller: function($scope, userService){
      $scope.users = [];

      userService.loadUsers().then(function(data){
        $scope.users = data;
        //console.log($scope.users);
      });

      $scope.addContact = function(user){
        alert('Thêm liên lạc!');
      }
    }
  });